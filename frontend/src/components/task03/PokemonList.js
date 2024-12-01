import React, { useState, useEffect } from 'react';
import { fetchTranslations } from '../../services/api';
import './style.css';

const PokemonList = () => {
    const [types, setTypes] = useState([]);
    const [language, setLanguage] = useState('english');
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonDetails, setPokemonDetails] = useState([]);

    function handleSetQuery(data) {
        setSearchQuery(data);
    }
    function pokemonHovered(id) {
        let selectedPokemon = pokemonList.find(pokemon => pokemon.id === id);
        selectedPokemon.type = translateType(selectedPokemon.type);
        setPokemonDetails(selectedPokemon);
        document.body.style.overflow = 'hidden';
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '1';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            closeDetails();
        });

    }
    const translateType = (typesArray) => {
        if (!Array.isArray(typesArray)) {
            console.error('Expected an array for types, but got', typesArray);
            return [];
        }

        const translatedTypes = types.reduce((acc, type) => {
            acc[type.english] = type.translated;
            return acc;
        }, {});

        return typesArray.map(type => translatedTypes[type] || type);
    };

    function closeDetails() {
        setPokemonDetails([]);
        document.body.style.overflow = '';
        const overlay = document.querySelector('div[style*="rgba(0, 0, 0, 0.5)"]');
        if (overlay) {
            overlay.remove();
        }
    }
    useEffect(() => {
        loadPokemonList();
    }, [searchQuery]);

    const loadTypes = async (lang) => {
        const { types } = await fetchTranslations();
        const translatedTypes = types.map((item) => ({
            english: item.english,
            translated: item[lang] || item.english
        }));
        setTypes(translatedTypes);
        setSelectedTypes(translatedTypes.map(type => type.english));
    };

    const loadPokemonList = async () => {
        const typesQuery = selectedTypes.map(selectedTypes => `types[]=${encodeURIComponent(selectedTypes)}`).join('&');
        const response = await fetch(`http://localhost:8000/api/pokemon/search?${typesQuery}&searchQuery=${searchQuery}`);
        const data = await response.json();

        if (!data) {
            console.error('No pokemonList found in response:', data);
            return;
        }

        const pokemons = data.map((item) => ({
            id: item.id,
            name: item.name[language] || item.name.english,
            type: item.type,
            base: item.base,
            imageUrl: `http://localhost:8000/api/pokemon/image/${item.id}`
        }));

        setPokemonList(pokemons);
    };

    useEffect(() => {
        loadTypes(language);
    }, [language]);

    useEffect(() => {
        loadPokemonList();
    }, [selectedTypes, language]);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleTypeChange = (e) => {
        const { value, checked } = e.target;
        setSelectedTypes((prevSelectedTypes) => {
            if (checked) {
                return [...prevSelectedTypes, value];
            } else {
                return prevSelectedTypes.filter((type) => type !== value);
            }
        });
    };

    return (
        <div>
            <div id="filters">
                <div id="searchAndLang">
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => handleSetQuery(e.target.value)} />
                    <select onChange={handleLanguageChange}>
                        <option value="english">English</option>
                        <option value="japanese">Japanese</option>
                        <option value="chinese">Chinese</option>
                    </select>
                </div>
                <div id="checkboxes">
                    {types.map((type, index) => (
                        <div className="checkbox" key={index}>
                            <input
                                type="checkbox"
                                value={type.english}
                                id={type.english}
                                checked={selectedTypes.includes(type.english)}
                                onChange={handleTypeChange}
                            />
                            <label htmlFor={type.english}>{type.translated}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div id="pokemonDetails">
                {pokemonDetails && pokemonDetails.name ? (
                    <>
                        <input type="button" value="X" onClick={() => closeDetails()} />
                        <h2>Name: {pokemonDetails.name}</h2>
                        <img src={pokemonDetails.imageUrl} />
                        <h4>{pokemonDetails.type.join(', ')}</h4>
                        <h4>HP: {pokemonDetails.base.HP}</h4>
                        <h4>Attack: {pokemonDetails.base.Attack}</h4>
                        <h4>Defense: {pokemonDetails.base.Defense}</h4>
                        <h4>Sp. Attack: {pokemonDetails.base['Sp. Attack']}</h4>
                        <h4>Sp. Defense: {pokemonDetails.base['Sp. Defense']}</h4>
                        <h4>Speed:{pokemonDetails.base.Speed}</h4>

                    </>
                ) : (
                    <div></div>
                )}
            </div>
            <div id="pokemonList">
                {pokemonList.length === 0 ? (
                    <p>No Pokemon found for the selected types.</p>
                ) : (
                    pokemonList.map((pokemon) => (
                        <div key={pokemon.id} onClick={() => pokemonHovered(pokemon.id)}>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.imageUrl} alt={pokemon.name} width={100} height={100} />
                            {/* <p>Types: {pokemon.type.join(', ')}</p>
                            <p>Base Stats: {JSON.stringify(pokemon.base)}</p> */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PokemonList;

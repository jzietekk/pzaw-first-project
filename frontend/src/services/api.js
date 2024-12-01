import axios from 'axios';

export const fetchTranslations = async () => {
    try {
        const types = await axios.get('http://localhost:8000/api/pokemon/types');

        return { types: types.data };
    } catch (error) {
        console.error('Error fetching translations:', error);
        return { types: [] };
    }
};

export const fetchPokemonList = async (types) => {
    try {
        const pokemonList = await axios.get(`http://localhost:8000/api/pokemon`);

        return { pokemonList: pokemonList.data };
    } catch (error) {
        console.error('Error fetching pokemon list:', error);
        return { pokemonList: [] };
    }
};


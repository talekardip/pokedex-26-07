// import axios from "axios";

// const API_BASE_URL = 'https://pokeapi.co/api/v2';

// export const fetchPokemonModal = async (id: string) => {
//     try {
//         const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
//         return res.data;
//     }
//     catch (error) {
//     }
// };

// export const fetchPokemonSpecies = async (id:string ) => {
//     try {
//         const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
//         return res.data;

//     }
//     catch (error) {

//     }
// };


// export const fetchPokemonWeakAgainst = async (pokemonName: string) => {
//     try {
//       const pokemonRes = await axios.get(`${API_BASE_URL}/pokemon/${pokemonName}`);
//       const pokemonData = pokemonRes.data;
//       const types = pokemonData.types.map((t: any) => t.type.name);
//       const weaknesses = new Set();
//       for (const type of types) {
//         const typeRes = await axios.get(`${API_BASE_URL}/type/${type}`);
//         const typeData = typeRes.data;
//         typeData.damage_relations.double_damage_from.forEach((t: any) => weaknesses.add(t.name));
//       }
//       return Array.from(weaknesses);
//     } catch (error) {
//       console.error("Error fetching Pokémon data:", error);
//       throw error;
//     }
//   };

//   export const fetchPokemonDescription = async (id: string) => {
//     try {
//         const response = await axios.get(
//             `${API_BASE_URL}/pokemon-species/${id}`
//         );
//         const description = response.data.flavor_text_entries.find(
//             (entry: { language: { name: string } }) =>
//                 entry.language.name === 'en'
//         )?.flavor_text;
        
//         return description;
//     } catch (error) {
//         console.error('Error fetching Pokemon description:', error);
//         throw error;
//     }
//   };


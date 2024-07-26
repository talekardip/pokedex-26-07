import { getRequest } from "../utils/request";


const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonAllList = async(offset:number,limit:number)=>{
    try{
        const res = await getRequest(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
        return res;
    }
    catch(err){
        console.error('Error in fetchPokemonAllList:', err);
    }
}

export const fetchPokemonModal = async (id: string) => {
    try {
        const res = await getRequest(`${API_BASE_URL}/pokemon/${id}/`)
        return res;
    }
    catch (error) {
    }
};

export const fetchPokemonSpecies = async (id:string ) => {
    try {
        const res = await getRequest(`${API_BASE_URL}/pokemon-species/${id}`)
        return res;

    }
    catch (error) {

    }
};


export const fetchPokemonWeakAgainst = async (pokemonName: string) => {
    try {
      const pokemonRes = await getRequest(`${API_BASE_URL}/pokemon/${pokemonName}`);
      const pokemonData = pokemonRes;
      const types = pokemonData.types.map((t: any) => t.type.name);
      const weaknesses = new Set();
      for (const type of types) {
        const typeRes = await getRequest(`${API_BASE_URL}/type/${type}`);
        const typeData = typeRes;
        typeData.damage_relations.double_damage_from.forEach((t: any) => weaknesses.add(t.name));
      }
      return Array.from(weaknesses);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      throw error;
    }
  };

  export const fetchPokemonDescription = async (id: string) => {
    try {
        const data = await getRequest(`${API_BASE_URL}/pokemon-species/${id}`);
        const uniqueDescriptions = new Set<string>();
   
        data.flavor_text_entries.forEach((entry: any) => {
          if (entry.language.name === 'en') {
            const cleanedText = entry.flavor_text.replace(/[\n\f]/g, ' ').replace(/­/g, '').trim();
            uniqueDescriptions.add(cleanedText);
          }
        });
        const descriptions = Array.from(uniqueDescriptions).slice(0, 10).join(' ');
        return descriptions;
      } catch (error) {
        throw error;
      }
  };


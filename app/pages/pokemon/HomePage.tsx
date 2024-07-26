import React from 'react'
import Header from '../../components/atoms/Header/Header'
import CardList from '../../components/molecules/CartList/CartList'
import Filters from '../../components/molecules/Filters/Filters'
import axios from 'axios'
import { Pagination } from '@/app/components/molecules/Pagination/Pagination'
import { Metadata } from 'next';
import { fetchPokemonAllList, fetchPokemonSpecies } from '@/app/services/pokemonServices'





interface HomeProps {
  page: { [key: string]: string | string[] | undefined };
}
export async function generateMetadata({ page }: HomeProps): Promise<Metadata> {
  return {
    title: `PokémonList #${page.page} Details`,
    description: `List of pokemon on page no: ${page.page}`,
  };
}

const genderFromGenderRate = (genderRate: number) => {
  switch (genderRate) {
    case 0:
      return ['male'];
    case 8:
      return ['female'];
    case -1:
      return ['genderless'];
    default:
      return ['male', 'female'];
  }
}

let totalPages = 0;

async function getPokemonDetails(url: string) {
  const response = await axios.get(url);
  const data = response.data;

  const genderResponse = await fetchPokemonSpecies(data.id);
  // Map the data to the desired structure
  const gender: string[] = genderFromGenderRate(genderResponse.gender_rate);
  return {
    name: data.name,
    id: data.id,
    image: data.sprites.other.dream_world.front_default,  // Assuming you want the front default sprite
    types: data.types.map((type: any) => type.type.name),
    stats: data.stats,
    abilities: data.abilities,
    height: data.height,
    weight: data.weight,
    gender: gender,
  };
}

const fetchPokemonList = async (offset: number, limit: number) => {
  const data = await fetchPokemonAllList(offset,limit);
  totalPages = Math.ceil(data.count / 20);
  console.log('total pages',totalPages);
  const pokemonList = data.results;
  const detailedPokemonList = await Promise.all(pokemonList.map((pokemon: { url: string }) => getPokemonDetails(pokemon.url)));

  return detailedPokemonList;
}


const HomePage: React.FC<HomeProps> = async ({ page }) => {

 
  const currentPage = page?.page || 1;
  const limit = 20;
  const offset = (Number(currentPage) - 1) * limit;
  
  let detailedPokemonList = await fetchPokemonList(offset, limit)
  
  const typeArray = Array.isArray(page?.type) ? page?.type : page?.type?.split(',') || [];
  const genderArray = Array.isArray(page?.gender) ? page?.gender : page?.gender?.split(',') || [];
  let stats: { [key: string]: [number, number] } = {};
  try {
    const statsString = Array.isArray(page?.stats) ? page?.stats[0] : page?.stats;
    stats = JSON.parse(statsString || '{}');
  } catch (error) {
    console.error('Error parsing stats:', error);
  }
  const search = typeof page?.search === 'string' ? page?.search.toLowerCase() : '';

  // if(typeArray.length===0||genderArray.length===0||Object.keys(stats).length === 0||search===''){
  //   console.log('some filter is none');
  //   detailedPokemonList= await fetchPokemonList(offset,limit);
  // }

  const filteredPokemon = detailedPokemonList.filter((pokemon: any) => {

    const hasTypes = typeArray.every((type: string) => pokemon.types.includes(type.toLowerCase()));

    const hasGenders = genderArray.every((gender: string) => pokemon.gender.map((g: string) => g.toLowerCase()).includes(gender.toLowerCase()));

    const hasStats = Object.keys(stats).every(stat => {
      const [min, max] = stats[stat];
      const pokemonStat = pokemon.stats.find((s: any) => s.stat.name === stat);
      if (!pokemonStat) return false;
      const statValue = pokemonStat.base_stat;
      return statValue >= min && statValue <= max;
    });

    const hasSearch = search ? pokemon.name.toLowerCase().includes(search) : true;

    return hasTypes && hasStats && hasGenders && hasSearch;
  });

  return (

    <div className='p-10 pt-2 bg-PRIMARY min-h-screen'>
      <Header />
      <Filters />
      <CardList cardList={filteredPokemon} />
      <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
    </div>
  )
}

export default HomePage;


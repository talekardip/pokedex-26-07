import React from 'react';
import CreatureDetails from '@/app/components/atoms/ModalCreatureDetail/CreatureDetail';
import CreatureInfo from '@/app/components/atoms/ModalCreatureInfo/CreatureInfo';
import Stats from '@/app/components/atoms/ModalStats/ModalStats';
import EvolutionChain from '@/app/components/molecules/EvolutionChain/EvolutionChain'
import NavigationButtons from '@/app/components/atoms/NavigationButtons/NavigationButtons';
import { Metadata } from 'next';

import ModalHeadSection from '@/app/components/organism/ModalHeadSection/ModalHeadSection';
import { fetchPokemonModal, fetchPokemonSpecies } from '@/app/services/pokemonServices';

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Pokémon #${params.id} Details`,
    description: `Detailed page on Pokémon ${params.id}`,
  };
}


const PokemonPage = async ({ params }: Props) => {
  const id = params.id;

  const structuredData = await fetchPokemonModal(id);
  const formattedData = {
    image: structuredData?.sprites.other.dream_world.front_default,
    types: structuredData?.types.map((type: any) => type.type.name),
    id: structuredData?.id,
  }

  const dataSpecies = await fetchPokemonSpecies(id);
  

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto justify-center bg-PRIMARY bg-opacity-50">
      <div className="p-5 bg-PRIMARY h-fit rounded-lg max-w-4xl w-full relative flex flex-col ">
        
        <ModalHeadSection
          pokemonData={formattedData}
          id={id}
          name={structuredData.name}
        />


        <div className="p-4">
          <CreatureDetails
            name={''}
            id={''}
            height={structuredData?.height}
            weight={structuredData?.weight}
            eggGroups={dataSpecies?.egg_groups}
            gender = {dataSpecies?.gender_rate}
          />
          <CreatureInfo
            name={structuredData?.name}
            id={id}
            types={structuredData?.types}
            abilities={structuredData?.abilities}
          />
          <Stats
            data={structuredData?.stats}
          />
          <EvolutionChain id={id} chainUrl={dataSpecies?.evolution_chain?.url} />
        </div>
        <div className='block sm:hidden'>
          <NavigationButtons id={Number(id)}/>
        </div>
      </div>
    </div>

  );
}


export default PokemonPage;
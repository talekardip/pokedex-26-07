'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { pid } from 'process';
import ModalImageCard from '../../atoms/ModalImageCard/ModalImageCard';

interface EvolutionChainProps {
  id: any;
  chainUrl: string;
}


const EvolutionChain: React.FC<EvolutionChainProps> = ({ id, chainUrl }) => {

  const [evolutionChainData, setEvolutionChainData] = useState<any>();
  const [speciesList, setSpeciesList] = useState<any>();
  const [cardListData, setCardListData] = useState<any>();
  
  const fetchEvolutionChain = async (url: string = chainUrl) => {
    try {

      await axios.get(url)
        .then(res => {
          setEvolutionChainData(res.data);

        })
        .catch(err => {
          console.log(err);

        })
    }
    catch (err) {
      //ghh
    }
  }

  useEffect(() => {
    fetchEvolutionChain();
  }, [chainUrl])

  const extractSpecies = (chain: any) => {
    let speciesArray: any = [];

    const traverseChain = (node: any) => {
      if (node.species) {
        speciesArray.push(node.species);
      }
      if (node.evolves_to && node.evolves_to.length > 0) {
        node.evolves_to.forEach((evolution: any) => traverseChain(evolution));
      }
    };

    traverseChain(chain);

    setSpeciesList(speciesArray);
  };

  useEffect(() => {
    if (evolutionChainData) {

      extractSpecies(evolutionChainData.chain);
      // This will log the array of species objects
    }
  }, [evolutionChainData]);
  console.log(speciesList)


  const fetchPokemonImage = async (pokemonId: number = pid) => {
    try {

      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      return data.data
    }

    catch (error) {
      //   dispatch(fetchPokemonFailure(error.message));
    }
  };


  const cleanList = async () => {
    if (speciesList && speciesList?.length > 0) {
      const cleanedData = await Promise.all(
        speciesList?.map(async (species: any) => {
          const urlParts = species.url.split('/');
          const pid = urlParts[urlParts.length - 2];
          const data = await fetchPokemonImage(pid);
          return {
            name: species.name,
            id: pid,
            image: data.sprites.other.dream_world.front_default,
            types: data.types.map((type: any) => type.type.name),
            stats: data.stats,
          };
        })
      );
      console.log('cleanedData',cleanedData)
      setCardListData(cleanedData);
    }
  };

  useEffect(() => {
    cleanList();

  }, [speciesList])
  console.log('cardlistdata',cardListData);

  return (
    <div className='py-4'>
      <h2 className="text-lg font-bold mb-2">Evolution</h2>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-between w-full">
          {cardListData?.map((cardData: any, index: any) => (
            <React.Fragment key={index}>
              <div className='hidden md:block'>
                <ModalImageCard
                  pokemonData={cardData} 
                />
              </div>
              <div className='md:hidden'>
                <ModalImageCard
                  pokemonData={cardData}
                  
                />
              </div>
              {index < cardListData?.length - 1 && (
                <div className="flex items-center">
                  <div className="flex-grow border-t-2 border-gray-400"></div>
                  <div className="ml-2 mr-2">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow border-t-2 border-gray-400"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvolutionChain;
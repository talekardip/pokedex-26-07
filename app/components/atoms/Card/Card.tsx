'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { endpoints } from '@/app/utils/Endpoints';
// import { getColor } from '@/app/utils/functions';

interface CardProps {
  pokemonData: any;
  isTitle: boolean;
}

// const getColor=(type:any)=>{
//   switch (type.toLowerCase()) {
//     case 'normal':
//       return 'NORMAL';
//     case 'ice':
//       return 'ICE';
//     case 'fighting':
//       return 'FIGHTING';
//     case 'flying':
//       return 'FLYING';
//     case 'poison':
//       return 'POISON';
//     case 'ground':
//       return 'GROUND';
//     case 'rock':
//       return 'ROCK';
//     case 'bug':
//       return 'BUG';
//     case 'ghost':
//       return 'GHOST';
//     case 'steel':
//       return 'STEEL';
//     case 'fire':
//       return 'FIRE';
//     case 'water':
//       return 'WATER';
//     case 'grass':
//       return 'GRASS';
//     case 'electric':
//       return 'ELECTRIC';
//     case 'psychic':
//       return 'PSYCHIC';
//     case 'dragon':
//       return 'DRAGON';
//     case 'dark':
//       return 'DARK';
//     case 'fairy':
//       return 'FAIRY';
//     default:
//       return 'NORMAL';
//   }
// }

const Card: React.FC<CardProps> = ({ pokemonData, isTitle }) => {
  const [id, setId] = useState()
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [fromcolor, setFromColor] = useState<any>();
  const [tocolor, setToColor] = useState<any>();

  let finalFromColor = "";
  let finalToColor = "";

  switch (pokemonData?.types[0].toUpperCase()) {
    case "FIRE":
      finalFromColor = "from-FIRE";
      break;
    case "WATER":
      finalFromColor = "from-WATER";
      break;
    case "GRASS":
      finalFromColor = "from-GRASS";
      break;
    case "ELECTRIC":
      finalFromColor = "from-ELECTRIC";
      break;
    case "ICE":
      finalFromColor = "from-ICE";
      break;
    case "FIGHTING":
      finalFromColor = "from-FIGHTING";
      break;
    case "POISON":
      finalFromColor = "from-POISON";
      break;
    case "GROUND":
      finalFromColor = "from-GROUND";
      break;
    case "FLYING":
      finalFromColor = "from-FLYING";
      break;
    case "PSYCHIC":
      finalFromColor = "from-PSYCHIC";
      break;
    case "BUG":
      finalFromColor = "from-BUG";
      break;
    case "ROCK":
      finalFromColor = "from-ROCK";
      break;
    case "GHOST":
      finalFromColor = "from-GHOST";
      break;
    case "DRAGON":
      finalFromColor = "from-DRAGON";
      break;
    case "DARK":
      finalFromColor = "from-DARK";
      break;
    case "STEEL":
      finalFromColor = "from-STEEL";
      break;
    case "FAIRY":
      finalFromColor = "from-FAIRY";
      break;
    default:
      finalFromColor = "from-NORMAL";
      break;
  }

  switch (pokemonData?.types[1]?.toUpperCase()) {
    case "FIRE":
      finalToColor = "to-FIRE";
      break;
    case "WATER":
      finalToColor = "to-WATER";
      break;
    case "GRASS":
      finalToColor = "to-GRASS";
      break;
    case "ELECTRIC":
      finalToColor = "to-ELECTRIC";
      break;
    case "ICE":
      finalToColor = "to-ICE";
      break;
    case "FIGHTING":
      finalToColor = "to-FIGHTING";
      break;
    case "POISON":
      finalToColor = "to-POISON";
      break;
    case "GROUND":
      finalToColor = "to-GROUND";
      break;
    case "FLYING":
      finalToColor = "to-FLYING";
      break;
    case "PSYCHIC":
      finalToColor = "to-PSYCHIC";
      break;
    case "BUG":
      finalToColor = "to-BUG";
      break;
    case "ROCK":
      finalToColor = "to-ROCK";
      break;
    case "GHOST":
      finalToColor = "to-GHOST";
      break;
    case "DRAGON":
      finalToColor = "to-DRAGON";
      break;
    case "DARK":
      finalToColor = "to-DARK";
      break;
    case "STEEL":
      finalToColor = "to-STEEL";
      break;
    case "FAIRY":
      finalToColor = "to-FAIRY";
      break;
    default:
      finalToColor = "to-NORMAL";
      break;
  }


  useEffect(() => {
    if (pokemonData) {

      setId(pokemonData?.id);
      setName(pokemonData?.name);
      setImage(pokemonData?.image);
      // setFromColor(`from-${getColor(pokemonData?.types[0]?.toLowerCase())}`)
      // setToColor(`to-${getColor(pokemonData?.types[1]?.toLowerCase() || pokemonData?.types[0]?.toLowerCase())}`)
    } else {
      console.error('pokemonData is undefined');
    }

  }, [pokemonData]);


  return (
    <div>

      <Link href={`${endpoints.navigatePokemonPage}${id}`}>
        <div
          className={`w-full max-w-[170px] mx-auto h-[250px] rounded overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer bg-gradient-to-b ${finalFromColor} ${finalToColor}`}
        >

          <div className="flex h-full flex-col justify-center items-center">
            <div className='pt-5 h-3/4 '>
              <Image width={100} height={100} src={image ? image : ''} alt='image' className='object-contain h-full ' />
            </div>
            {isTitle && (
              <>
                <div className="font-bold text-xl mt-5 mb-2 px-3">{name}</div>
                <div className="text-gray-700 text-base px-3 pb-5 justify-center items-center">
                  <p className='text-center'>{id}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>

  );
};

export default Card;


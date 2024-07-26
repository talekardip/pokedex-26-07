'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { getColor } from '@/app/utils/functions';

interface ModalCardProps {
  image?:any;
  title?:any;
  pokemonData?: any;
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

const ModalImageCard: React.FC<ModalCardProps> = ({ image,title,pokemonData}) => {
  const [fromcolor,setFromColor] = useState<any>();
  const [tocolor,setToColor] = useState<any>();
 
  useEffect(() => {
    if (pokemonData) {
      setFromColor(`from-${getColor(pokemonData?.types[0]?.toLowerCase())}`)
      setToColor(`to-${getColor(pokemonData?.types[1]?.toLowerCase() || pokemonData?.types[0]?.toLowerCase())}`)
    } else {
      console.error('pokemonData is undefined');
    }

  }, [pokemonData]);
  return (
    
    <div>

      <Link href={`/pokemon/${pokemonData?pokemonData.id:''}`}>
        <div
          className={`max-w-[170px] md:w-[200px] sm:w-[200px] h-[250px] rounded overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer bg-gradient-to-b ${fromcolor} ${tocolor}`}
        >

          <div className="flex h-full flex-col justify-center items-center">
            <div className='pt-5 h-3/4 '>
              <Image width={100} height={100} src={ pokemonData && pokemonData.image?pokemonData.image:""} alt='image' className='object-contain h-full ' />
            </div>
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ModalImageCard;

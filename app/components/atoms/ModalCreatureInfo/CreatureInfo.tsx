import { fetchPokemonWeakAgainst } from '@/app/services/pokemonServices';
import { getColor } from '@/app/utils/functions';
import React from 'react';

interface TypesProps {
  name?: any;
  id?: any;
  types?: any;
  abilities?:any;
}

const CreatureInfo: React.FC<TypesProps> = async ({ name, id, types,abilities }) => {
  const abilitiesArray = Array.isArray(abilities) ? abilities : [];
  let weakAgainstList: any = [];
  var abilitesString = '';

  // const colorTypes=(type:string)=>{
  //   let fromcolor='';
  //   switch (type.toLowerCase()) {
  //     case 'normal':
  //       fromcolor = 'bg-NORMAL';
  //       break;
  //     case 'ice':
  //       fromcolor = 'bg-ICE';
  //       break;
  //     case 'fighting':
  //       fromcolor = 'bg-FIGHTING';
  //       break;
  //     case 'flying':
  //       fromcolor = 'bg-FLYING';
  //       break;
  //     case 'poison':
  //       fromcolor = 'bg-POISON';
  //       break;
  //     case 'ground':
  //       fromcolor = 'bg-GROUND';
  //       break;
  //     case 'rock':
  //       fromcolor = 'bg-ROCK';
  //       break;
  //     case 'bug':
  //       fromcolor = 'bg-BUG';
  //       break;
  //     case 'ghost':
  //       fromcolor = 'bg-GHOST';
  //       break;
  //     case 'steel':
  //       fromcolor = 'bg-STEEL';
  //       break;
  //     case 'fire':
  //       fromcolor = 'bg-FIRE';
  //       break;
  //     case 'water':
  //       fromcolor = 'bg-WATER';
  //       break;
  //     case 'grass':
  //       fromcolor = 'bg-GRASS';
  //       break;
  //     case 'electric':
  //       fromcolor = 'bg-ELECTRIC';
  //       break;
  //     case 'psychic':
  //       fromcolor = 'bg-PSYCHIC';
  //       break;
  //     case 'dragon':
   
  //       fromcolor = 'bg-DRAGON';
  //       break;
  //     case 'dark':
  //       fromcolor = 'bg-DARK';
  //       break;
  //     case 'fairy':
  //       fromcolor = 'bg-FAIRY';
  //       break;
  //     default:
  //       fromcolor = 'bg-red-400';
  //       break;
  //   }
  //   console.log('colors',fromcolor);
  //   return fromcolor;
  // }

  try {
    weakAgainstList = await fetchPokemonWeakAgainst(name);
  } catch (error) {
    console.error('Error fetching weak against types:', error);
  }
  console.log(weakAgainstList);
  
  for(const item of abilitiesArray){
     abilitesString+=((item.ability.name) +',');
  }
   abilitesString = abilitesString.slice(0,-1);

  return (
    <div className=" p-6  mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Abilities</h3>
          {/* <p className="text-gray-700">{abilitesString}</p> */}
          <div className='flex flex-wrap items-center w-full'>
            {
              abilities?.map((item:any,index:number)=>(
                <span className="mr-1" key={index}>{item.ability.name}</span>
              ))
            }
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Types</h3>
          <div className="flex flex-wrap items-center w-full">
            {
              types?.map((item: any, index: number) => (

                <span className={`bg-${getColor(item.type.name)}  px-2 py-1 rounded-md mr-2`} key={index}>{item.type.name}</span>
              ))

            }
          </div>
         
        </div>
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold">Weak Against</h3>
          <div className="flex flex-wrap items-center w-full">
            
            {
              weakAgainstList?.map((item: any, index: number) => (

                <span className={`bg-${getColor(item)}  px-2 py-1 rounded-md mr-2`} key={index}>{item}</span>
              ))
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatureInfo;
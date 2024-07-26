import React from 'react';
import ModalImageCard from '../../atoms/ModalImageCard/ModalImageCard';
import ModalControlButtons from '../../molecules/ModalControlButtons/ModalControlButtons';
import BackButton from '../../atoms/BackButton/BackButton';
import CreatureDescription from '../../atoms/CreatureDescription/CreatureDescription';
import Link from 'next/link';

interface Props{
    pokemonData:any;
    id:string;
    name:string;
}

const ModalHeadSection = ({pokemonData,id,name}:Props) =>{

    return (
        <div className="flex ">
          <div className="w-1/3 h-full p-4">
            <ModalImageCard pokemonData={pokemonData} />
          </div>
          <div className="w-2/3 p-4">
            <div className="flex justify-between items-center border-b pb-4 mb-4 ">
              <div className='text-2xl font-bold border-r border-SECONDARY pr-5 '>
                {name}
              </div>
              <div className='text-xl font-medium border-r border-SECONDARY pr-5'>
                {id}
              </div>
              <div className="hidden sm:block">
                <ModalControlButtons id={Number(id)}/>
              </div>
              <div className='block sm:hidden'>
              <Link href={''}><BackButton /></Link>
              </div>

            </div>
            <CreatureDescription id={id}/>
          </div>
          
        </div>
    );
}

export default ModalHeadSection;
'use client'
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { endpoints } from '@/app/utils/Endpoints';




interface NavigationButtonProps {
  id: number;
}



const NavigationButtons: React.FC<NavigationButtonProps> = ({ id }) => {

  const [curId, setCurId] = useState<number>(id);
  const [nextId, setNextId] = useState<number>(id + 1);
  const [prevId, setPrevId] = useState<number>(id > 1 ? id - 1 : 1);


  useEffect(() => {
    setCurId(id);
    setNextId(id + 1);
    setPrevId(id > 1 ? id - 1 : 1);
  }, [id]);



  return (
    <div className="flex justify-center items-center">
      <Link href={`${endpoints.navigatePokemonPage}${prevId}`} passHref>
        <button

          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
          
          aria-label="Previous"
        >
          previous
          
        </button>
      </Link>



      <Link href={`${endpoints.navigatePokemonPage}${nextId}`} passHref>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          
          aria-label="Next"
        >
          next
        </button>
      </Link>
    </div>
  );
};

export default NavigationButtons;

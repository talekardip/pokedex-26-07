'use client'
import React, { useState } from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Slider from '../Slider/Slider';
import SearchBox from '../SearchBox/SearchBox';
import Hamburger from '../Hamburger/Hamburger';

const Filters = () => {
  const [openComponent, setOpenComponent] = useState<string>('');

  const handleComponentToggle = (componentName: React.SetStateAction<string>) => {
    if (openComponent === componentName) {
      setOpenComponent('');
    } else {
      setOpenComponent(componentName);
    }
  };

  return (
    <div className="flex justify-between items-center gap-5  py-4 rounded-md">
      <div className="flex w-4/5 md:w-1/2">
        <SearchBox />
      </div>
      <div className='hidden md:flex justify-between w-1/2 gap-3'>
        <div className="w-[170px]">
          <Dropdown 
            items={['Normal', 'Fighting', 'Flying', 'Poison', 'Ground','dark','ghost','grass','water']} 
            label="Type" 
            isOpen={openComponent === 'type'}
            onToggle={() => handleComponentToggle('type')}
          />
        </div>
        <div className="w-[170px]">
          <Dropdown 
            items={['Male','Female','genderless']} 
            label="Gender" 
            isOpen={openComponent === 'gender'}
            onToggle={() => handleComponentToggle('gender')}
          />
        </div>
        <div className="w-[170px]">
          <Slider 
            isOpen={openComponent === 'stats'}
            onToggle={() => handleComponentToggle('stats')}
          />
        </div>
      </div>
      <div className='flex md:hidden justify-between h-full'>
        <Hamburger />
      </div>
    </div>
  );
};

export default Filters;
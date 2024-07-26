import React, { useState } from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Slider from '../Slider/Slider';

interface FilterModalProps {
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
    const [openComponent, setOpenComponent] = useState<string | null>(null);

    const handleComponentToggle = (componentName: string) => {
        if (openComponent === componentName) {
            setOpenComponent(null);
        } else {
            setOpenComponent(componentName);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center overflow-y-scroll">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl">×</button>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center w-full border border-gray-300 rounded">
                        <Dropdown 
                            items={['Normal', 'Fighting', 'Flying', 'Poison', 'Ground','dark','ghost','grass','water']} 
                            label="Type" 
                            isOpen={openComponent === 'type'}
                            onToggle={() => handleComponentToggle('type')}
                        />
                    </div>
                    <div className="flex justify-between items-center w-full border border-gray-300 rounded">
                        <Dropdown 
                            items={['Male','Female','genderless']} 
                            label="Gender" 
                            isOpen={openComponent === 'gender'}
                            onToggle={() => handleComponentToggle('gender')}
                        />
                    </div>
                    <div className="flex justify-between items-center w-full border border-gray-300 rounded">
                        <Slider  
                            isOpen={openComponent === 'stats'}
                            onToggle={() => handleComponentToggle('stats')}
                        />
                    </div>
                    <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 border border-gray-300 rounded">Reset</button>
                    <button className="px-4 py-2 bg-SECONDARY text-white rounded">Apply</button>
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default FilterModal;
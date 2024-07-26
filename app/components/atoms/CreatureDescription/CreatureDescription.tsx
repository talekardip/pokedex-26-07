'use client'

import { fetchPokemonDescription } from '@/app/services/pokemonServices';
import React, { useEffect, useState } from 'react';

interface Props {
    id: string;
}

const CreatureDescription: React.FC<Props> = ({ id }) => {

    const [description, setDescription] = useState('');
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const getDescription = async () => {
            try {
                const desc = await fetchPokemonDescription(id);
                console.log('Fetched description:', desc);
                setDescription(desc);
            } catch (error) {
                console.error('Error fetching description:', error);
            }
        };

        getDescription();
    }, [id]);

    console.log('Rendering component with description:', description);
    const handleReadMore = () => {
        setShowFullDescription(true);
    };

    const handleReadLess = () => {
        setShowFullDescription(false);
    };
    
    return (

        <div>
            <div className="hidden sm:block text-gray-700">
                {`${description.slice(0,300)}`}
                {!showFullDescription && (
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={handleReadMore}
                    >
                        ...Read More
                    </button>
                )}

            </div>
            <div className='block sm:hidden'>
                {`${description.slice(0,150)}`}
                {!showFullDescription && (
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={handleReadMore}
                    >
                        ...Read More
                    </button>
                )}
            </div>
            {showFullDescription && (
                <div className="flex md:w-[92%] bg-SECONDARY rounded-md justify-between items-start top-72 absolute ml-4 mr-8 left-5">
                    <div className='flex w-8/10 p-2'>
                        <p className="text-white">{description}</p>
                    </div>
                    <div className='flex w-2/10 pr-3'>
                        <button
                            className="text-white hover:text-gray-300"
                            onClick={handleReadLess}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default CreatureDescription;

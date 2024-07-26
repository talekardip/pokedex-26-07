import React from 'react';
import Card from '../../atoms/Card/Card';

interface cardListProps{
  cardList:any;
}

const CardList: React.FC<cardListProps> = ({cardList}) => {

  return (
    <div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      
      {cardList.map((pokemon: { id: React.Key | null | undefined; }, index: any) => (
          
            <Card
              pokemonData = {pokemon}
              isTitle={true}
              key={pokemon.id}
            />
          
        ))}
          
    </div>
    
    </div>
  );
};

export default CardList;

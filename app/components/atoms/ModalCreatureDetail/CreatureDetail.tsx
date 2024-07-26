'use client'
import React, { useEffect, useState } from 'react';

interface CreatureDetailProps {
  name?: any;
  id?: any;
  height?: any;
  weight?: any;
  eggGroups?: any;
  gender?:any;
}

const genderFromGenderRate = (genderRate: number) => {
  switch (genderRate) {
    case 0:
      return 'male';
    case 8:
      return 'female';
    case -1:
      return 'genderless';
    default:
      return 'male, female';
  }
}

const CreatureDetails: React.FC<CreatureDetailProps> = ({ name, id, height, weight, eggGroups,gender }) => {
  const [ftHeight, setFtHeight] = useState('');
  const [adjustedWeight, setAdjustedWeight] = useState(0);
  const [heightcm,setheightcm] = useState(0);
  const [genderDetail,setGenderDetail] = useState('');

  const eggGroupsArray = Array.isArray(eggGroups) ? eggGroups : [];
  var eggGroupsString = '';
  for (const item of eggGroupsArray) {
    eggGroupsString += ((item.name) + ',');
  }
  eggGroupsString = eggGroupsString.slice(0, -1);

  const convertHeight=()=>{
    let temp = heightcm;
    temp*=10;
    temp *= 0.0328084;
    let ft = Math.ceil(temp * 10) / 10;
    let ftString = ft.toFixed(1).replace('.', '\'');
    ftString+='"';
    setFtHeight(ftString);
  }

  useEffect(() => {
    setheightcm(height || 0);
  }, [height]);
  useEffect(() => {
    convertHeight();
  }, [heightcm]);

  useEffect(() => {
    setAdjustedWeight(weight / 10); // Adjust weight by dividing by 10
  }, [weight]);

  useEffect(()=>{
    setGenderDetail(genderFromGenderRate(gender));
  },[genderDetail]);


  return (
    <div className="p-6 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Height</h3>
          <p className="text-gray-700">{ftHeight}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Weight</h3>
          <p className="text-gray-700">{adjustedWeight} Kg</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Gender(s)</h3>
          <p className="text-gray-700">{genderDetail}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Egg Groups</h3>
          <p className="text-gray-700">{eggGroupsString}</p>
        </div>
      </div>
    </div>
  );
};

export default CreatureDetails;
import React from 'react';

interface StatsProps {
  // hp: number;
  // defense: number;
  // spAttack: number;
  // attack: number;
  // speed: number;
  // spDef: number;
  data: any
}

const Stats: React.FC<StatsProps> = ({
  data
}) => {

  return (
    <div className=" p-4 bg-PASTELBLUE">
      <h2 className="text-lg font-bold mb-2">Stats</h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">

        {
          data?.map((item: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{item.stat.name}</span>
                <span>{item.base_stat}</span>
              </div>
              <div className="bg-BLUEGREY h-4 rounded">
                <div
                  className="bg-SECONDARY h-4 rounded"
                  style={{ width: `${( item.base_stat  / 210) * 100}%` }}
                ></div>
              </div>
            </div>
          ))
        }
      
      </div>
    </div>
  );
};

export default Stats;
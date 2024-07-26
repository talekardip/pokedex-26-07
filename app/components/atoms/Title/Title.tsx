import React from 'react'

const Title = () => {
  return (
    <div className="flex  flex-col md:flex-row md:items-center justify-start md:space-x-4 mt-10 w-full max-w-4xl">
      <div className='text-indigo-950 flex items-center h-[60%] font-bold text-2xl pb-4 md:pb-0'>Pokédex</div>
      <div className='pt-4 md:pt-0 flex h-[40px] items-center md:pl-4 border-t md:border-t-0 md:border-l border-black md:mt-0 m-0 text-indigo'>Search for any Pokemon that exists on the planet</div>
    </div>
  )
}

export default Title;

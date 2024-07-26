"use client";
import React, { useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const placeholder:any = 'Search...';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    
    const currentParams = new URLSearchParams(window.location.search);
    if (query.trim().length > 0) {
      currentParams.set('search', query);
    } else {
      currentParams.delete('search');
    }
    
    router.push(`?${currentParams.toString()}`);
    
  };

  return (
    <div className="flex w-full items-center">
      <label htmlFor="search" className="sr-only">{placeholder}</label>
      <input
        type="text"
        value={query}
        id='search'
        onChange={handleChange}
        placeholder={placeholder}
        name="search"
        className="px-4 py-2 border w-full bg-DROPDOWNCOLOR border-black-300 rounded-l-md focus:outline-none border-r-0"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 h-full border border-black-300 bg-DROPDOWNCOLOR text-black rounded-r-md focus:outline-none border-l-0"
      >
        <span className="sr-only">Search</span>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBox;

'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('page', page.toString());
    
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="pagination flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='bg-SECONDARY text-white p-2'
        >
        Previous
        </button>
     
       <span>Page {currentPage} of {totalPages}</span>
       <button
         onClick={() => handlePageChange(currentPage + 1)}
         disabled={currentPage === totalPages}
         className='bg-SECONDARY text-white p-2'
         >

         Next
       </button>
    </div>
  );
};

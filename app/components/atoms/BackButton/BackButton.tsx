'use client'
import React from 'react';
import { useRouter } from 'next/navigation';


function BackButton() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
      };
  
    return (
        <button
        onClick={handleBack}
      
      className="text-gray-500 hover:text-gray-700 mx-2"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    );
}

export default BackButton;

// 'use client'
// import React, { KeyboardEvent } from 'react';
// import { useRouter } from 'next/navigation';

// function BackButton() {
//   const router = useRouter();

//   const handleBack = () => {
//     router.back();
//   };

//   const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       event.preventDefault();
//       handleBack();
//     }
//   };

//   return (
//     <button
//       onClick={handleBack}
//       onKeyDown={handleKeyDown}
//       className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2"
//       aria-label="Go back"
//       tabIndex={0}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         aria-hidden="true"
//       >
//         <path
//           fillRule="evenodd"
//           d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </button>
//   );
// }

// export default BackButton;
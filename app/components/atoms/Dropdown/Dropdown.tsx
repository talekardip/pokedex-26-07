// import {  useState } from "react";
// import { useRouter } from 'next/navigation';

// interface DropdownProps {
//   items: string[];
//   label: string;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const Dropdown: React.FC<DropdownProps> = ({ items, label, isOpen, onToggle }) => {
//   const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
//   const router = useRouter();


//   const handleItemClick = (item: string) => {
//     const newSelectedItems = new Set(selectedItems);
//     if (newSelectedItems.has(item)) {
//       newSelectedItems.delete(item);
//     } else {
//       newSelectedItems.add(item);
//     }
//     setSelectedItems(newSelectedItems);

//     const currentParams = new URLSearchParams(window.location.search);
//     if (newSelectedItems.size > 0) {
//       currentParams.set(label.toLowerCase(), Array.from(newSelectedItems).join(','));
//     } else {
//       currentParams.delete(label.toLowerCase());
//     }
    
//     router.push(`?${currentParams.toString()}`);
//   };

//   const newLabel = selectedItems.size > 0 ? Array.from(selectedItems)[0] : label;

//   return (
//     <div className="relative inline-block w-full bg-DROPDOWNCOLOR">
//       <button
//         onClick={onToggle}
//         className="flex items-center justify-between px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
//       >
//         {selectedItems.size > 1 ? (<div className="text-sm">{newLabel} + {selectedItems.size - 1} More</div> ): <div className="text-sm">{newLabel}</div>}
//         <svg
//           className={`ml-2 h-4 w-4 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>
//       {isOpen && (
//         <ul className="absolute z-10 mt-2 bg-white shadow-md rounded-lg p-4 w-full">
//           {items.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleItemClick(item)}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedItems.has(item)}
//                 onChange={() => handleItemClick(item)}
//                 className="mr-2"
//               />
//               <div className="text-xs">{item}</div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dropdown;



import {  useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

interface DropdownProps {
  items: string[];
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, label, isOpen, onToggle }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const router = useRouter();
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const paramValue = searchParams.get(label.toLowerCase());
    if (paramValue) {
      setSelectedItems(new Set(paramValue.split(',')));
    }
  }, [searchParams, label]);

  const handleItemClick = (item: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(item)) {
      newSelectedItems.delete(item);
    } else {
      newSelectedItems.add(item);
    }
    setSelectedItems(newSelectedItems);

    const currentParams = new URLSearchParams(window.location.search);
    if (newSelectedItems.size > 0) {
      currentParams.set(label.toLowerCase(), Array.from(newSelectedItems).join(','));
    } else {
      currentParams.delete(label.toLowerCase());
    }
    console.log('abc-->',currentParams.toString())
    router.push(`?${currentParams.toString()}`);
  };

  const newLabel = selectedItems.size > 0 ? Array.from(selectedItems)[0] : label;

  return (
    <div className="relative inline-block w-full bg-DROPDOWNCOLOR">
      <button
        onClick={onToggle}
        className="flex items-center justify-between px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
      >
        {selectedItems.size > 1 ? (<div className="text-sm">{newLabel} + {selectedItems.size - 1} More</div> ): <div className="text-sm">{newLabel}</div>}
        <svg
          className={`ml-2 h-4 w-4 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 bg-white shadow-md rounded-lg p-4 w-full">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <input
                type="checkbox"
                checked={selectedItems.has(item)}
                onChange={() => handleItemClick(item)}
                className="mr-2"
              />
              <div className="text-xs">{item}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

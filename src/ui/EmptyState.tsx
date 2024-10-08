import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 mb-4 text-gray-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C10.9 2 10 2.9 10 4V6C8.34 6 7 7.34 7 9V17C7 18.66 8.34 20 10 20H14C15.66 20 17 18.66 17 17V9C17 7.34 15.66 6 14 6V4C14 2.9 13.1 2 12 2ZM12 0C13.66 0 15 1.34 15 3V5C17.76 5 20 7.24 20 10V17C20 19.76 17.76 22 15 22H9C6.24 22 4 19.76 4 17V10C4 7.24 6.24 5 9 5V3C9 1.34 10.34 0 12 0ZM12 12C11.17 12 10.5 12.67 10.5 13.5C10.5 14.33 11.17 15 12 15C12.83 15 13.5 14.33 13.5 13.5C13.5 12.67 12.83 12 12 12Z" />
      </svg>
      <h2 className="text-xl font-semibold text-gray-800">No Messages</h2>
      <p className="mt-2 text-gray-500">It looks like you have no messages at the moment.</p>
    </div>
  );
};

export default EmptyState;

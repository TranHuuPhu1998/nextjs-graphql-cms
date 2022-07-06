import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full container mx-auto">
      <div className="flex flex-col items-center py-12">
        <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
          Javascript Blog
        </a>
        <p className="text-lg text-gray-600">We're a place where coders share, stay up-to-date and grow their careers.</p>
      </div>
    </header>
  );
};

export default Header;

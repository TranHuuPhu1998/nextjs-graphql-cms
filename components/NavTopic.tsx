import React from 'react';

const NavTopic: React.FC = () => {
  return (
    <nav className="w-full py-4 border-t border-b bg-gray-100">
      <div className="block sm:hidden">
        <a href="#" className="md:hidden text-base font-bold uppercase text-center flex justify-center items-center">
          Topics <i className="fas ml-2" />
        </a>
      </div>
      <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Error handling
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Promises
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Forms
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            VueJs
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            Typescript
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            ReactJs
          </a>
          <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
            NextJs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavTopic;

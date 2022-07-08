import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from 'services/getCategories';
import { toast } from 'react-toastify';
interface ICategory {
  id: string;
  name: string;
  slug: string;
}

const NavTopic: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => {
        setCategories(newCategories);
      })
      .catch((err) => toast.error(err));
  }, []);

  return (
    <nav className="w-full py-4 border-t border-b bg-gray-100">
      <div className="block sm:hidden">
        <a href="/topics" className="md:hidden text-base font-bold uppercase text-center flex justify-center items-center">
          Topics <i className="fas ml-2" />
        </a>
      </div>
      <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          {categories.map((category: ICategory, index: number) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">{category.name}</a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavTopic;

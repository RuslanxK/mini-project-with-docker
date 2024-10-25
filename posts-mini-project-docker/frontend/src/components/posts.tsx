import React from 'react';
import { useFetchData } from '../hooks/useAPI';
import { API_URLS } from '../utils/api';
import { Post } from '../interfaces/post';
import { format } from 'date-fns';

const Posts: React.FC = () => {
  const { data, error, isLoading } = useFetchData<Post[]>('posts', API_URLS.posts);

  if (isLoading) return <p className="text-center text-lg font-semibold text-gray-500 animate-pulse">Loading...</p>;

  if (error && error instanceof Error) {
    return <p className="text-center text-red-500 font-medium">{error.message}</p>;
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-100">
      <h1 className="text-5xl font-bold text-center mb-16 text-gray-900 tracking-tight">Our Latest Posts</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {data?.map((post) => (
          <li key={post.id} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-1 text-gray-800">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
              </div>
              <div className="flex justify-end mt-auto">
                <button className="bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                  Read More
                </button>
              </div>
            </div>
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default Posts;

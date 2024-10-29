// PostsContainer.tsx
import React from 'react';
import { useFetchData } from '../hooks/useAPI';
import { API_URLS } from '../utils/api';
import Posts from './posts';
import { Post } from '../interfaces/post';

const PostsContainer: React.FC = () => {
  const { data, error, isLoading } = useFetchData<Post[]>('posts', API_URLS.posts);

  const typedError = error instanceof Error ? error : null;

  const handleReadMoreClick = (postId: string) => {
    alert(`Clicked on post ID: ${postId}`);
  };

  return (
    <Posts
      postsData={data || []}
      isLoading={isLoading}
      error={typedError}
      onReadMore={handleReadMoreClick} 
    />
  );
};

export default PostsContainer;

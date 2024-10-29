import { render, screen } from '@testing-library/react';
import Posts from '../../src/components/posts';
import { describe, it, expect } from 'vitest';
import { Post } from '../../src/interfaces/post';

// Mock data for the tests
const mockPost: Post = {
  _id: '1',
  title: 'First Post',
  description: 'This is the first post description.',
  createdAt: '2024-10-28T12:34:56Z',
};

describe('Posts Component', () => {
  // Test: Verifies that the loading message is displayed when the component is in a loading state
  it('should render the loading state', () => {
    render(<Posts postsData={[]} isLoading={true} />);
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  // Test: Verifies that the component displays a message when there are no posts
  it('should display a message when there are no posts', () => {
    render(<Posts postsData={[]} />);
    const noPostsMessage = screen.getByText(/no posts yet/i);
    expect(noPostsMessage).toBeInTheDocument();
  });

  // Test: Verifies that an error message is displayed when the component receives an error prop
  it('should display an error message when there is an error', () => {
    const error = new Error('Failed to fetch posts');
    render(<Posts postsData={[]} error={error} />);
    const errorElement = screen.getByText(/failed to fetch posts/i);
    expect(errorElement).toBeInTheDocument();
  });

  // Test: Checks if the component renders posts inside a list element
  it('should render posts inside a list structure', () => {
    render(<Posts postsData={[mockPost]} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });


  // Test: Verifies that the post title and description are rendered correctly
  it('should render the post title and description correctly', () => {
    render(<Posts postsData={[mockPost]} />);
    
    const postTitle = screen.getByRole('heading', { name: /first post/i });
    expect(postTitle).toBeInTheDocument();

    const postDescription = screen.getByText(/this is the first post description/i);
    expect(postDescription).toBeInTheDocument();
  });

  // Test: Checks if the "Read More" button is rendered for each post
  it('should render the "Read More" button', () => {
    render(<Posts postsData={[mockPost]} />);
    const readMoreButton = screen.getByRole('button', { name: /read more/i });
    expect(readMoreButton).toBeInTheDocument();
  });

  // Test: Verifies that the post date is formatted and displayed correctly
  it('should format the date correctly', () => {
    render(<Posts postsData={[mockPost]} />);
    const formattedDate = screen.getByText('October 28, 2024');
    expect(formattedDate).toBeInTheDocument();
  });

  // Test: Verifies that the "Read More" button triggers the function when clicked
  it('should call the function when the "Read More" button is clicked', () => {
    const mockFunction = vi.fn();
    render(<Posts postsData={[mockPost]} onReadMore={mockFunction} />);
    
    const button = screen.getByRole('button', { name: /read more/i });
    button.click();
  
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});

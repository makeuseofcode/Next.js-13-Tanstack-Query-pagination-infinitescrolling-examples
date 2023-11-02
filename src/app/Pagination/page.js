"use client"
import React, { useState } from 'react';
import { useQuery} from '@tanstack/react-query';
import './page.styles.css';


export default function Pagination() {
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isLoading, isError, error, data } = useQuery({
    keepPreviousData: true,
    queryKey: ['posts', page],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (<h2>Loading...</h2>);
  }

  if (isError) {
    return (<h2 className="error-message">{error.message}</h2>); 
  }

  return (
    <div>
      <h2 className="header">Next.js Pagination</h2> 
      {data && (
        <div className="card">
          <ul className="post-list"> 
            {data.map((post) => (
                <li key={post.id} className="post-item">{post.title}</li> 
            ))}
          </ul>
        </div>
      )}

      <div className='btn-container'>
        <button
          onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
          disabled={page === 1}
          className="prev-button" 
        >Prev Page</button>

        <button
          onClick={() => setPage(prevState => prevState + 1)}
          className="next-button"
        >Next Page</button>
      </div>
    </div>
  );
}


"use client"
import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';



export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(client);
      const query = `*[_type == 'post'] | order(_slug asc){
        summary,
        title,
        image,
        "slug": slug.current
      }`;
console.log(query);
      try {
        const fetchedPosts = await client.fetch(query);
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Shri Shivay Namastubhyam</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <img src={urlForImage(post.image)} alt={post.title} />
          <p>Slug: {post.slug}</p>
        </div>
      ))}
    </>
  );
}
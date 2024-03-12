"use client"
import React, { useState, useEffect } from 'react';
import client from "../../../sanity/lib/client";
import Image from "next/image"; 
import { urlForImage } from '../../../sanity/lib/image';
import Card from '../components/Card/page';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == 'post'] | order(_slug asc){
        summary,
        title,
        image,
        "slug": slug.current
      }`;

      try {
        const fetchedPosts = await client.fetch(query);
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
      <section className="flex">
        <div className='flex flex-col items-center p-10'>
          <h1 className="text-3xl font-semibold inline-10">
            Unlocking the Power of Next.js: A Journey into Modern Web Development
          </h1>
       
          <Image src={urlForImage(posts[0].image)} width={500} height={500} alt={posts[0].title} />
          <p>
            Next.js, the dynamic React framework, is a game-changer in the world of web development, seamlessly blending simplicity with powerful features. From its effortless setup to the magic of Server-Side Rendering, Next.js empowers developers to create fast, interactive, and SEO-friendly applications. The component-based architecture enhances code organization and reusability, while dynamic routing and data fetching open doors to dynamic, data-driven experiences. With built-in optimizations for performance and straightforward API integration, Next.js is a versatile tool. Whether you're a beginner or a seasoned developer, embracing Next.js unlocks a future where building modern web applications is not just efficient but a joyous journey into the heart of cutting-edge development.
          </p>
        </div>
      </section>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold p-2">Blogs</h2>
        <div className="p-1 flex flex-col md:flex-row gap-1 justify-center ">
          {posts.map((post) => (
            <div key={post.slug}>
              <Card postData={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;

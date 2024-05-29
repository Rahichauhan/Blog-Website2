import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

const Blog = ({params}) => {
  const postId = params.id[0];
  const [singlePost, setSinglePost] = useState(null);
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
        const post = fetchedPosts.find((post) => post._id === postId);
        setSinglePost(post);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !singlePost) {
    return <p>Error: Post not found</p>; // Handle error or post not found
  }

  return (
    <div className='flex flex-col justify-center items-center gap-1'>
      <h1 className='text-6xl font-bold p-5'>
        {singlePost.title}
      </h1>
      <div className='w-[70vw] p-4'>
        <Image src={urlForImage(singlePost.image)} layout='responsive' width={100} height={100} alt="Loading" />
      </div>
      <div className="text-2xl font-semibold">
        {singlePost.author.name}
      </div>
      <div className='px-12 text-xl pt-4 text-center'>
        <PortableText value={singlePost.summary} />
      </div>
    </div>
  );
};

export default Blog;

import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import {notFound} from "next/navigation"

async function getData(id) {
  const res = await fetch(`http://next-js-learn-rose.vercel.app/api/posts/${id}`,
  { cache: 'no-store' ,
  });

  if (!res.ok) {
    return notFound()
  }
 
  return res.json();
}


export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    desc: post.desc,
  };
}


const BlogPost = async({params}) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1>{data.title}</h1>
          <p>{data.desc}</p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt="author pic"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt="author"
            width={200}
            height={300}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p>{data.content}</p>
      </div>
    </div>
  )
}

export default BlogPost
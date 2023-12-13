"use client"

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {/* we have the posts passed by data, and we can take that data, and for each individual post/prompt we are returning a PrompCard component  */}
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [searchText, setearchText]= useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) =>{

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  },[])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      <PromptCardList data={posts} handleCardList={() => {}}/>
    </section>
  )
}

export default Feed
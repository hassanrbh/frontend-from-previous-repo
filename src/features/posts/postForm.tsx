import React, { useState } from 'react'
import { createPostAsync } from "./postsSlice";

interface PostFormType {
  dispatch: any
}

export const PostForm = (props: PostFormType) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handlePostForm(e: any) {
    e.preventDefault();
    const form_data = {
      todo: {
        title: title,
        body: body,
      }
    }

    props.dispatch(createPostAsync(form_data))
    resetPostForm();
  }

  function resetPostForm() {
    setTitle("");
    setBody("");
  }
  
  return (
    <div>
      Post Form
      <form onSubmit={handlePostForm}>
        <label id="body-title">Title: </label>
        <input type="text"
            placeholder="Post title"
            name="post-title"
            value={title}
            id="body-title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}/>
        <br />
        <label id="post-body">Body: </label>
        <input type="text"
            placeholder="Post Body"
            name="post-body"
            value={body}
            id="post-body"
            onChange={(e) => {
              setBody(e.target.value);
            }}/>
        <br />
        <input type="submit" value="Post me"/>
      </form>
    </div>
  )
}

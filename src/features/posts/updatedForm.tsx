import React from 'react'
import { UpdatePostAsync } from "./postsSlice";

interface UpdateFormType {
	UpdatedTitle: string;
	setUpdatedTitle: any,
	UpdatedBody:  string,
	setUpdatedBody: any,
  dispatch: any,
  id: number,
}
export const UpdatedForm = ({UpdatedTitle,setUpdatedTitle, UpdatedBody,setUpdatedBody, dispatch, id}: UpdateFormType) => {
  const UpdateRealValues = (e: any) => { 
    e.preventDefault();
    const form_data = {
      post: {
        id: id,
        title: UpdatedTitle,
        body: UpdatedBody,
      }
    }
    dispatch(UpdatePostAsync(form_data))
  }
  return (
    <form onSubmit={UpdateRealValues}>
      <input type="text"
              value={UpdatedTitle}
              name="updated-title"
              id="post-title"
              onChange={(e) => {
                setUpdatedTitle(e.target.value);
              }}/>
      <input type="text"
              value={UpdatedBody}
              name="updated-body"
              id="post-body"
              onChange={(e) => {
                setUpdatedBody(e.target.value);
              }}/>
      <input type="submit" value="Edit Post" />
    </form>
  )
}

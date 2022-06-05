import React, { useState } from 'react'
import { ButtonGroup } from './ButtonGroup'
import { UpdateButton } from './UpdateButton'
import { UpdatedForm } from './updatedForm'

interface PostContainer {
  dispatch: object,
  title: string,
  body: string,
  done: boolean
  id: number,
}

export const Post = ({dispatch,title, body, done,id}: PostContainer) => {
  const [isUserToggleUpdate, setIsToggleUpdate] = useState(false);
  const [UpdatedTitle, setUpdatedTitle] = useState(title);
  const [UpdatedBody, setUpdatedBody] = useState(body);
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsToggleUpdate(!isUserToggleUpdate)
  }
  const updateButton = (
    <UpdateButton handleClick={handleClick} />
  )
  const updateForm = (
    <UpdatedForm UpdatedTitle={UpdatedTitle}
        setUpdatedTitle={setUpdatedTitle}
        UpdatedBody={UpdatedBody}
        setUpdatedBody={setUpdatedBody}
        dispatch={dispatch}
        id={id}
        />
  )
  return (
    <div>
      <div className="post">
        <div className="post-title">
          <h1>{title}</h1>
          <ButtonGroup 
            post_id={id}
            dispatch={dispatch}/>
          {updateButton}
          {isUserToggleUpdate ? updateForm : false}
        </div>
        <div className="post-body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { DeletePostAsync } from './postsSlice';

interface ButtonGroupType {
	post_id: number,
	dispatch: any,
}

export const ButtonGroup = (props: ButtonGroupType) => {
	function handleDelete(e: any) {
		e.preventDefault()
		const postForm = {
			post: {
				id: props.post_id
			}
		}
		props.dispatch(DeletePostAsync(postForm));
	}

  return (
    <button onClick={handleDelete}>
			Deleted
		</button>
  )
}

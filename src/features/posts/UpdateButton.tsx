import React from 'react';

interface UpdatedButtonType {
  handleClick: any,
}

export const UpdateButton = (props: UpdatedButtonType) => {
  return (
    <button onClick={props.handleClick}>
			Edit Toggle
		</button>
  )
}

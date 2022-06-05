import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Post } from './post';
import { PostForm } from './postForm';
import { FetchPostsAsync, SelectPosts, SelectStatus , Status} from './postsSlice';

const Posts = () => {
  const posts = useAppSelector(SelectPosts);
  const status = useAppSelector(SelectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchPostsAsync())
  },[dispatch])

  let content;

  if (status !== Status.UpToDate) {
    content = <div>{status}</div>
  } else {
    content = <div className="card">
      <div className="card-body">
        <h3>{status}</h3>
        <PostForm dispatch={dispatch}/>
        {posts && posts.length > 1 && posts.map(post => {
          return <div key={post.id}>
            <Post dispatch={dispatch}
                title={post.title}
                body={post.body}
                done={post.done}
                id={post.id}/>
          </div>
        })}
      </div>
    </div>
  }

  return (
    <div>
      Posts
      {content}
    </div>
  )
}

export default Posts;

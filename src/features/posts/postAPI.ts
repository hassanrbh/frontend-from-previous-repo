import { PostsState, UpdatePostAsync, UpdatePostAsyncData } from './postsSlice';
import axios from "axios";
import { PostFormData } from "./postsSlice";
import { DeleteFormData } from "./postsSlice";


const BASE_URL = "http://localhost:3000/api/v1"

export async function FetchPosts() {
    return fetch(`${BASE_URL}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
    .catch((error) => {
        console.error(error)
    })
}

export async function FetchPost(payload: PostFormData) {
    const todo = payload.todo;
    return fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo,
        })
    }).then((response) => response.json())
    .catch((error) => {
        console.error(error)
    })
}

export async function DeletePost(payload: DeleteFormData) {
    const todo = payload.post;
    return fetch(`${BASE_URL}/todos/${payload.post.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo
        })
    }).then((response) => response.json())
    .catch((error) => {
        console.error(error)
    })
}

export async function UpdatePost(payload: UpdatePostAsyncData) {
    const todo = payload.post;
    return fetch(`${BASE_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo
        })
    }).then((response) => response.json())
    .catch((error) => {
        console.error(error)
    })
}
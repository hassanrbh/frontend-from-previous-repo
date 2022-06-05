import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { FetchPost, FetchPosts, UpdatePost } from "./postAPI";
import { DeletePost } from "./postAPI";

export enum Status {
    Initial = "Not Fetched",
    Loading = "Loading ...",
    UpToDate = "Up To Date",
    Deleted = "Deleting ...",
    Error = "Error"
}

export interface PostState {
    id: number;
    title: string;
    body: string;
    done: boolean;
    created_at: any;
    updated_at: any;
}

export interface PostsState {
    posts: PostState[];
    status: string;
}

const initialState: PostsState = {
    posts: [
        {
            id: 0,
            title: "",
            body: "",
            done: false,
            created_at: "",
            updated_at: "",
        }
    ],
    status: Status.Initial,
}

export interface PostFormData {
    todo: {
        id?: string,
        title: string,
        body: string,
    }
}

export const createPostAsync: any = createAsyncThunk(
    "posts/createPost",
    async (payload: PostFormData) => {
        const post = await FetchPost(payload);
        return post
    }
)

export interface DeleteFormData {
    post: {
        id: number,
    }
}

export const DeletePostAsync: any = createAsyncThunk(
    "posts/deletePost",
    async (payload: DeleteFormData) => {
        const post_deleted = await DeletePost(payload);
        return post_deleted;
    }
)

export const FetchPostsAsync: any = createAsyncThunk(
    "posts/FetchPosts",
    async () => {
        const posts = await FetchPosts();
        return posts;
    },
)

export interface UpdatePostAsyncData {
    post: {
        id: number,
        title: string,
        body: string
    }
}

export const UpdatePostAsync: any = createAsyncThunk(
    "posts/UpdatePost",
    async (payload: UpdatePostAsyncData) => {
        const post_update = await UpdatePost(payload);
        return post_update;
    }
) 


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* Fetch Posts */
            .addCase(FetchPostsAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Loading;
                })
            })
            .addCase(FetchPostsAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts = action.payload;
                    draftState.status = Status.UpToDate
                })
            })
            .addCase(FetchPostsAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Error
                })
            })

            /** CreatePost */
            .addCase(createPostAsync.pending, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Loading;
                })
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    console.log(action.payload)
                    draftState.posts.push(action.payload);
                    draftState.status = Status.UpToDate
                })
            })
            .addCase(createPostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Error
                })
            })

            /* DELETEPost */
            .addCase(DeletePostAsync.pending, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Loading;
                })
            })
            .addCase(DeletePostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    // const post_index = draftState.posts.indexOf(action.payload);
                    // if (post_index === -1 ) {
                    //     draftState.posts.slice(1, post_index)
                    // }
                    draftState.posts = action.payload;
                    draftState.status = Status.UpToDate
                })
            })
            .addCase(DeletePostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Error
                })
            })

            /* UpdatePost */
            .addCase(UpdatePostAsync.pending, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Loading;
                })
            })
            .addCase(UpdatePostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    const index = draftState.posts.findIndex(
                        post => post.id === action.payload.id
                    )
                    draftState.posts[index] = action.payload;
                    draftState.status = Status.UpToDate
                })
            })
            .addCase(UpdatePostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Status.Error
                })
            })
    }
})

// export const {} = postsSlice.actions;
export const SelectPosts = (state: RootState) => state.posts.posts;
export const SelectStatus = (state: RootState) => state.posts.status;
export default postsSlice.reducer;
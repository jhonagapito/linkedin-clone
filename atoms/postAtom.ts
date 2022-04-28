import { atom } from "recoil";
import { UserPost } from "../models/UserPost";

export const handlePostState = atom({
    key: 'handlePostState',
    default: false
})

export const getPostState = atom({
    key: 'getPostState',
    default: {} as UserPost
})

export const useSSRPostsState = atom({
    key: 'useSSRPostsState',
    default: true
})
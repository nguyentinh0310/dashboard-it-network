import { IPost, ListParams, ListResponse, PostPayLoad } from "models";
import axiosClient from "./axiosClient";

export const postApi = {
  getAll(params?: ListParams): Promise<ListResponse<IPost>> {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
  getPosts(): Promise<ListResponse<IPost>> {
    const url = "/posts?limit=5";
    return axiosClient.get(url);
  },
  getById(id: string): Promise<IPost> {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  getUserPosts(id: string): Promise<IPost> {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  create(payload: PostPayLoad): Promise<IPost> {
    const url = "/posts";
    return axiosClient.post(url, payload);
  },
  update(id: string, payload: Partial<IPost>): Promise<IPost> {
    const url = `/posts/${id}`;
    return axiosClient.put(url, payload);
  },
  remove(id: string): Promise<any> {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
  removeMany(ids: string[]): Promise<any> {
    const url = `/posts`;
    return axiosClient.delete(url, { data: ids });
  },
  likePost(id: string): Promise<any> {
    const url = `/posts/${id}/like`;
    return axiosClient.put(url);
  },
  unLikePost(id: string): Promise<any> {
    const url = `/posts/${id}/unlike`;
    return axiosClient.put(url);
  },
  savePost(id: string): Promise<any> {
    const url = `/posts/save-post/${id}`;
    return axiosClient.put(url);
  },
  unSavePost(id: string): Promise<any> {
    const url = `/posts/unsaved-post/${id}`;
    return axiosClient.put(url);
  },
};

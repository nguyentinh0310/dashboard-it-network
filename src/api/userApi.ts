import { ListParams } from "./../models/common";
import { IUser, ListResponse, PaginationParams } from "../models";
import axiosClient from "./axiosClient";

export interface userSate {
  data: IUser[];
  pagination: PaginationParams;
}

export const userApi = {
  getAll(params?: ListParams): Promise<ListResponse<IUser>> {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
  getUsers(): Promise<ListResponse<IUser>> {
    const url = "/users?limit=8";
    return axiosClient.get(url);
  },
  getById(id: string | number): Promise<IUser> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  add(data: IUser): Promise<IUser> {
    const url = `/users`;
    return axiosClient.post(url, data);
  },
  update(data: IUser): Promise<IUser> {
    const url = `/users`;
    return axiosClient.put(url, data);
  },
  updateRole(data: any, id: string): Promise<any> {
    const url = `/update_role/${id}`;
    return axiosClient.put(url, data);
  },
  remove(id: string | number): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
  removeMany(ids: string[]): Promise<any> {
    const url = `/users`;
    return axiosClient.delete(url, { data: ids });
  },
};

import { IConversation, ListParams, ListResponse } from "models";
import axiosClient from "./axiosClient";

export const conversationsApi = {
  getAll(params?: ListParams): Promise<ListResponse<IConversation>> {
    const url = "/conversations/all";
    return axiosClient.get(url, { params });
  },
  remove(id: string): Promise<any> {
    const url = `/conversations/${id}`;
    return axiosClient.delete(url);
  },
  isRead(id: any): Promise<any> {
    const url = `/conversations/isRead/${id}`;
    return axiosClient.put(url);
  },
  isUnReadConv(id: any): Promise<any> {
    const url = `/conversations/isUnRead/${id}`;
    return axiosClient.put(url);
  },
};

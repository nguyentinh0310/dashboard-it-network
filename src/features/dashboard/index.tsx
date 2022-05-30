import { fetchListComment } from "app/commentSlice";
import { fetchListConversation } from "app/conversationSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchListPost, fetchPostsLimit } from "app/postSlice";
import { fetchListUserLimit } from "app/userSlice";
import { IPost, IUser } from "models";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { items, totalRows } = useAppSelector((state) => state.user);
  const { posts, totalPost } = useAppSelector((state) => state.post);
  const { totalCmt } = useAppSelector((state) => state.comment);
  const { totalConv } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(fetchListUserLimit());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPostsLimit());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListConversation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListComment());
  }, [dispatch]);

  return (
    <div className="container-fluid px-4">
      <div className="row g-3 my-2">
        <div className="col-md-3 col-sm-6">
          <div className="p-3 bg-white box-count shadow-sm d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-2">{totalRows}</h3>
              <p className="fs-5">Nguời dùng</p>
            </div>
            <i className="fa-solid fa-user-large fs-1 primary-text border rounded-full p-3"></i>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="p-3 bg-white box-count shadow-sm d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-2">{totalPost}</h3>
              <p className="fs-5">Bài viết</p>
            </div>
            <i className="fa-solid fa-thumbs-up fs-1 primary-text border rounded-full p-3"></i>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="p-3 bg-white box-count shadow-sm d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-2">{totalCmt}</h3>
              <p className="fs-5">Bình luận</p>
            </div>
            <i className="fa-solid fa-comment fs-1 primary-text border rounded-full p-3"></i>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="p-3 bg-white box-count shadow-sm d-flex justify-content-around align-items-center">
            <div>
              <h3 className="fs-2">{totalConv}</h3>
              <p className="fs-5">Tin nhắn</p>
            </div>
            <i className="fa-solid fa-message fs-1 primary-text border rounded-full p-3"></i>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-lg-6 col-sm-12">
          <h3 className="fs-4 mb-3">Người dùng mới</h3>
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Tài khoản</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((user: IUser, index: any) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className="avatar text-center">
                    <img src={user?.avatar} alt="" />
                  </td>
                  <td>{user?.fullname}</td>
                  <td>{user?.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-6 col-sm-12">
          <h3 className="fs-4 mb-3">Bài viết mới nhất</h3>
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nội dung</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Thích</th>
                <th scope="col">Bình luận</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post: IPost, index: any) => (
                <tr key={post?._id}>
                  <td>{index + 1}</td>
                  <td>
                    {post?.content.length < 30
                      ? post?.content
                      : post?.content.slice(0, 30) + "... "}
                  </td>
                  <td className="image-post">
                    <img
                      src={
                        post.images.length > 0
                          ? post.images[0].url
                          : "https://res.cloudinary.com/dwgximj2j/image/upload/v1652075296/avatars/default-image_wygqce.jpg"
                      }
                      alt=""
                    />
                  </td>
                  <td>{post.likes.length}</td>
                  <td>{post.comments.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

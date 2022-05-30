import { postApi } from "api/post-api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchListPost } from "app/postSlice";
import { Pagination } from "components";
import { IPost } from "models";
import queryString from "query-string";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";

const PostFeature = () => {
  const { loading, posts, totalPost } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const queryParams = useMemo(() => {
    const params: any = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 5,
    };
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchListPost(queryParams));
  }, [dispatch, queryParams]);

  const handleSelectRow = (id: string) => {
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id) !== -1
      ? (newSelectedItems = selectedItems.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItems(newSelectedItems);
  };

  const onPageChanged = (page: number) => {
    const filters = {
      ...queryParams,
      page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleDelete = () => {
    if (selectedItems) {
      swal({
        title: "Xác nhận",
        text: `Bạn muốn xóa ${selectedItems.length} bài viết ?`,
        icon: "warning",
        buttons: ["Hủy", "Đồng ý"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await postApi.removeMany(selectedItems);
          setSelectedItems([]);
          dispatch(fetchListPost());
        }
      });
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">Danh sách bài viết</h1>

      <div>
        <div className="d-flex justify-content-end mb-3">
          &nbsp;
          {selectedItems.length > 0 && (
            <Fragment>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                <span className="fa fa-trash"></span> Xóa
              </button>
              &nbsp;
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setSelectedItems([])}
              >
                <i className="fas fa-check"></i> Bỏ đánh dấu
              </button>
            </Fragment>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nội dung</th>
            <th>Lượt thích</th>
            <th>Bình luận</th>
            <th>Xem</th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="text-center">
            <tr>
              <td>
                <span className="spinner-border spinner-border-sm mt-1 text-center"></span>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {
              posts?.map((post: IPost) => (
                <tr
                  key={post?._id}
                  className={`table-row ${
                    selectedItems.indexOf(post._id) !== -1 ? "selected" : ""
                  }`}
                  onClick={() => handleSelectRow(post._id)}
                >
                  <td>
                    <input
                      type="checkbox"
                      value={`${post._id}`}
                      onChange={() => handleSelectRow(post._id)}
                      checked={selectedItems.indexOf(post._id) !== -1}
                    />
                  </td>
                  <td>{post._id}</td>
                  <td>
                    {post?.content.length < 40
                      ? post?.content
                      : post?.content.slice(0, 40) + "... "}
                  </td>
                  <td>{post.likes.length}</td>
                  <td>{post.comments.length}</td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    &nbsp;
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>

      <div>
        <Pagination
          totalRecords={Math.ceil(totalPost / 5)}
          pageLimit={5}
          pageSize={1}
          onPageChanged={onPageChanged}
        ></Pagination>
      </div>
    </div>
  );
};

export default PostFeature;

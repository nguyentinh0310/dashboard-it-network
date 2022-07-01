import { userApi } from "api/userApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchListUser, fetchListUserLimit, searchUser } from "app/userSlice";
import { Pagination } from "components";
import { IUser } from "models";
import queryString from "query-string";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import swal from "sweetalert";
import { ModalUser } from "../components/ModalUser";
import SearchTerm from "../components/SearchTerm";

const ListPage = () => {
  const { loading, items, totalRows } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const match = useRouteMatch();
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
    dispatch(fetchListUser(queryParams));
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

  const handleSearchForm = async (formValues: any) => {
    setTimeout(async () => {
      await dispatch(searchUser(formValues));
    }, 300);
  };

  const handleEditUser = (user: IUser) => {
    history.push(`${match.url}/${user._id}`);
  };

  const handleDelete = () => {
    if (selectedItems) {
      swal({
        title: "Xác nhận",
        text: `Bạn muốn xóa ${selectedItems.length} người dùng ?`,
        icon: "warning",
        buttons: ["Hủy", "Đồng ý"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // if (user?.role === 0) {
          await userApi.removeMany(selectedItems);
          // } else {
          //   toast.error("Không được phép xóa admin");
          // }
          setSelectedItems([]);
          dispatch(fetchListUserLimit());
        }
      });
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">Danh sách người dùng</h1>

      <div>
        <div className="d-flex justify-content-end mb-3">
          <Link to={`${match.url}/add`}>
            <button className="btn btn-primary">+ Thêm</button>
          </Link>
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
      <SearchTerm onSubmit={handleSearchForm} />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Tài khoản</th>
            <th>Vai trò</th>
            <th>Hành động</th>
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
            {items?.map((user: IUser) => (
              <tr
                key={user._id}
                className={`table-row ${
                  selectedItems.indexOf(user._id) !== -1 ? "selected" : ""
                }`}
                onClick={() => handleSelectRow(user._id)}
              >
                <td>
                  <input
                    type="checkbox"
                    value={`${user._id}`}
                    onChange={() => handleSelectRow(user._id)}
                    checked={selectedItems.indexOf(user._id) !== -1}
                  />
                </td>
                <td>{user._id}</td>
                <td>{user.fullname}</td>
                <td>{user.account}</td>
                <td>{user.role === 1 ? "Admin" : "Người dùng"}</td>
                <td>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" data-bs-id={`${user._id}`}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <ModalUser user={user} />
                  &nbsp;
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <div>
        <Pagination
          totalRecords={Math.ceil(totalRows / 5)}
          pageLimit={5}
          pageSize={1}
          onPageChanged={onPageChanged}
        ></Pagination>
      </div>
    </div>
  );
};

export default ListPage;

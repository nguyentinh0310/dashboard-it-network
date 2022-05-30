import { useAppDispatch } from "app/hooks";
import { push } from "connected-react-router";
import { logout } from "features/auth/authSlice";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export function SideBar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("persist:root");
    push("/login");
  };
  return (
    <div className="bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
        <Link to="/admin">IT Network</Link>
      </div>
      <div className="list-group list-group-flush my-3">
        <NavLink
          to="/admin/dashboard"
          className="list-group-item list-group-item-action bg-transparent second-text"
        >
          <i className="fas fa-tachometer-alt me-2"></i>Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-project-diagram me-2"></i>Người dùng
        </NavLink>
        <NavLink
          to="/admin/posts"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fa-solid fa-blog"></i> Bài viết
        </NavLink>
        <a
          href="/#"
          className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
          onClick={handleLogout}
        >
          <i className="fas fa-power-off me-2"></i>Logout
        </a>
      </div>
    </div>
  );
}

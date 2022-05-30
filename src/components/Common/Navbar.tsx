import { useAppDispatch, useAppSelector } from "app/hooks";
import { getCurrentLogginUser } from "features/auth/authSlice";
import React, { useEffect } from "react";

export interface NavbarProps {
  toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCurrentLogginUser());
  }, [dispatch]);

  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-between navbar-light bg-transparent py-4 px-4">
      <div className="d-flex align-items-center">
        <i
          className="fas fa-align-left primary-text fs-4 me-3"
          id="menu-toggle"
          onClick={toggleSidebar}
        ></i>
        <h2 className="fs-2 m-0">Dashboard</h2>
      </div>
      <div className="d-flex align-items-center justify-content-end">
        <span className="avatar">
          <img src={user?.avatar} alt="" />
        </span>
        &nbsp;
        <span className="name fw-bold">{user?.fullname}</span>
      </div>
    </nav>
  );
}

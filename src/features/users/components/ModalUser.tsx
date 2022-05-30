import { IUser } from "models";
import React from "react";

export interface ModalUserProps {
    user: IUser
}

export function ModalUser({user}: ModalUserProps) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      aria-labelledby={`exampleModalLabel ${user._id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`exampleModalLabel ${user._id}`}>
              Chi tiết người dùng
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
              <div className="avatar-large">
                  <img src={user?.avatar} alt="" />
              </div>
              <p>Họ tên: {user.fullname}</p>
              <p>Tài khoản: {user.account}</p>
              <p>Vai trò: {user.role === 0 ? "Người dùng" : "Quản trị"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

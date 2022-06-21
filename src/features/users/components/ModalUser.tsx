import { IUser } from "models";
import React from "react";
import { Modal } from "react-bootstrap";

export interface ModalUserProps {
  user: IUser;
  show: boolean;
  setShow: Function;
}

export function ModalUser({ user, show, setShow }: ModalUserProps) {
  console.log(user)
  const handleClose = () => setShow(false)
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="avatar-large">
          <img src={user?.avatar} alt="" />
        </div>
        <p>Họ tên: {user.fullname}</p>
        <p>Tài khoản: {user.account}</p>
        <p>Vai trò: {user.role === 0 ? "Người dùng" : "Quản trị"}</p>
      </Modal.Body>
    </Modal>
  );
}

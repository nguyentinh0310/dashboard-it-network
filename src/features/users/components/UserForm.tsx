import { IUser } from "models";
import React, { ChangeEvent, FormEvent, useState } from "react";

export interface UserFormProps {
  defaultValues: IUser;
  onSubmit?: (formValues: IUser) => void;
  isEdit: boolean;
}

export default function UserForm({
  defaultValues,
  onSubmit,
  isEdit,
}: UserFormProps) {
  const [values, setValues] = useState<IUser>(defaultValues);
  const { fullname, account, password, role } = values;

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmitForm}>
        {isEdit ? (
          <>
            <div className="mb-3">
              <label className="form-label">Tài khoản</label>
              <input
                type="text"
                name="account"
                value={account}
                onChange={handleOnChange}
                className="form-control"
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Vai trò</label>
              <select
                className="form-select"
                value={role}
                onChange={handleOnChange}
              >
                <option value="0">Người dùng</option>
                <option value="1">Quản trị</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleOnChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tài khoản</label>
              <input
                type="text"
                name="account"
                value={account}
                onChange={handleOnChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                className="form-control"
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
  );
}

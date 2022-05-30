import { useAppDispatch, useAppSelector } from "app/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ILogin } from "models";
import { login } from "./authSlice";

export default function LoginPage() {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory()
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<ILogin>({
    account: "",
    password: "",
  });
  const { account, password } = values;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const resultAction = await dispatch(login(values));
      const user = unwrapResult(resultAction);

      localStorage.setItem("access_token", user.access_token);

      history.push("/admin");
      toast.success("Login successfully!");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapper-left">
        <div className="background"></div>
      </div>
      <div className="wrapper-right">
        <form onSubmit={handleSubmitForm}>
          <div className="logo">
            <h1 className="title">IT Network</h1>
            <p>Mạng xã hội dành cho IT</p>
          </div>
          <h1 className="mb-3 text-center title-login">Đăng nhập</h1>
          <div className="mb-3">
            <input
              type="account"
              name="account"
              placeholder="Tài khoản"
              value={account}
              onChange={handleOnChange}
              className={
                "form-control " + (submitted && !account ? "is-invalid" : "")
              }
            />
            {submitted && !account && (
              <div className="invalid-feedback">account is required</div>
            )}
          </div>
          <div className="mb-3 show-pass">
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={handleOnChange}
              className={
                "form-control " + (submitted && !password ? "is-invalid" : "")
              }
            />
            {submitted && !password && (
              <div className="invalid-feedback">Password is required</div>
            )}
            {!submitted && (
              <small
                className="icon-small"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </small>
            )}
          </div>
          <div className="mb-3 d-flex justify-content-end">
            <a href="#">Quên mật khẩu?</a>
          </div>
          <div className="mt-2 mb-3 d-flex justify-content-center">
            <button className="btn">
              Đăng nhập
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <a href="#">Chưa có tài khoản. Tạo tài khoản mới</a>
          </div>
        </form>
      </div>
    </div>
  );
}

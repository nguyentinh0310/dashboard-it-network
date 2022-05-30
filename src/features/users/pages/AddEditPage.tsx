import { userApi } from "api/userApi";
import { IUser } from "models";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserForm from "../components/UserForm";

const AddEditPage = () => {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (!userId) return;

    // IFFE
    (async () => {
      try {
        const data: IUser = await userApi.getById(userId);
        setUser(data);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [userId]);

  const defaultValues: any = Boolean(userId)
    ? user
    : {
        fullname: "",
        account: "",
        password: "",
        role: 0,
      };

  const handleFormSubmit = async (formValues: IUser) => {
    if (isEdit) {
      await userApi.updateRole(formValues, userId);
      console.log(formValues);
    } else {
      await userApi.add(formValues);
    }
    toast.success("Thành công!");

    history.push("/admin/users");
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">
        {isEdit ? "Cập nhật người dùng" : "Thêm người dùng"}
      </h1>
      {(!isEdit || Boolean(user)) && (
        <UserForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default AddEditPage;

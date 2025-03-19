import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  resetUserError,
  selectErrorAuthorize,
  selectPendingAuthorize,
  userAuthorize,
} from "../../../Entities/User/UserSlice";
import styles from "../UserAuthorizationForm.module.scss";
import { useNavigate } from "react-router-dom";
import { UserAuthorizationType } from "../../../Entities/User/dto/UserSlice.dto";
import { InputRow } from "../../../Shared/ui/InputRow/InputRow";

const UserAuthorizationForm: FC = () => {
  const [formData, setFormData] = useState<UserAuthorizationType>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserError(1));
  }, []);

  const pending = useAppSelector(selectPendingAuthorize);
  const error = useAppSelector(selectErrorAuthorize);

  const navigate = useNavigate();

  const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userAuthorize(formData)).then((arg) => {
      if (arg.payload) navigate("/");
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <InputRow
        type={"email"}
        name={"email"}
        label={"Email"}
        onChange={handleChange}
      />
      <InputRow
        type={"password"}
        name={"password"}
        label={"Password"}
        onChange={handleChange}
        autoComplete="on"
      />
      <button type="submit">{pending ? "Sending..." : "Login"}</button>
      {error ? <div className={styles.error}>{error}</div> : null}
    </form>
  );
};

export default UserAuthorizationForm;

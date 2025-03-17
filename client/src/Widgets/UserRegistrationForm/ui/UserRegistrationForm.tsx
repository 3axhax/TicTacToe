import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Shared/storeHooks";
import {
  resetUserError,
  selectErrorAuthorize,
  selectPendingAuthorize,
  userRegistration,
} from "../../../Entities/User/UserSlice";
import styles from "../UserRegistrationForm.module.scss";
import { useNavigate } from "react-router-dom";
import { userRegistrationType } from "../../../Entities/User/dto/UserSlice.dto";
import { InputRow } from "../../../Shared/ui/InputRow/InputRow";

const UserRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<userRegistrationType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserError());
  }, []);

  const pending = useAppSelector(selectPendingAuthorize);
  const error = useAppSelector(selectErrorAuthorize);

  const navigate = useNavigate();

  const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userRegistration(formData)).then((arg) => {
      if (arg.payload) navigate("/");
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <InputRow name={"name"} label={"Name"} onChange={handleChange} />
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
        autoComplete="off"
      />
      <InputRow
        type={"password"}
        name={"confirmPassword"}
        label={"Confirm Password"}
        onChange={handleChange}
        autoComplete="off"
      />
      <button type="submit">{pending ? "Sending..." : "Register"}</button>
      {error ? <div className={styles.error}>{error}</div> : null}
    </form>
  );
};

export default UserRegistrationForm;

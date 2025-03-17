import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";
import styles from "./InputRow.module.scss";

interface InputRowPropsType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: "input" | "email" | "password";
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export const InputRow: FC<InputRowPropsType> = ({
  label,
  name,
  type = "input",
  onChange,
  ...props
}) => {
  return (
    <div className={styles.row}>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} onChange={onChange} {...props} />
    </div>
  );
};

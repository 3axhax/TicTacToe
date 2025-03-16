import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../Shared/storeHooks";
import {
    authorizationData, selectErrorAuthorize,
    selectPendingAuthorize,
    userAuthorize
} from "../../../Entities/User/UserSlice";
import styles from '../UserAuthorizationForm.module.scss'
import {useNavigate} from "react-router-dom";


const UserAuthorizationForm: React.FC = () => {

    const [formData, setFormData] = useState<authorizationData>({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const dispatch = useAppDispatch();

    const pending = useAppSelector(selectPendingAuthorize)
    const error = useAppSelector(selectErrorAuthorize)

    const navigate = useNavigate();

    const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(userAuthorize(formData)).then((arg) => {
            if(arg.payload) navigate("/");
        });
    }

    return (
        <form className={styles.form} onSubmit={onSubmitForm}>
            <div className={styles.row}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="on"
                    onChange={handleChange}/>
            </div>
            <button type="submit">{pending ? 'Sending...' : 'Send'}</button>
            {error ?
                <div className={styles.error}>
                    {error}
                </div>
                : null
            }
        </form>
    )
}

export default UserAuthorizationForm
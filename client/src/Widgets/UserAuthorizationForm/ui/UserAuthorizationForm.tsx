import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../Shared/storeHooks";
import {
    authorizationData, selectErrorAuthorize,
    selectPendingAuthorize,
    setName,
    userAuthorize
} from "../../../Entities/User/UserSlice";


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

    const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setName(formData.email));
        dispatch(userAuthorize(formData));
    }

    return (
        <form className={'form__authorization'} onSubmit={onSubmitForm}>
            <div className={'input__row'}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div className={'input__row'}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}/>
            </div>
            <button type="submit">{pending ? 'Sending...' : 'Send'}</button>
            {error ?
                <div className={'form__error'}>
                    {error}
                </div>
                : null
            }
        </form>
    )
}

export default UserAuthorizationForm
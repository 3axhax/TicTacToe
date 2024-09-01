import React, {useState} from 'react';
import {useAppDispatch} from "../../../Shared/storeHooks";
import {authorizationData, setName, userAuthorize} from "../../../Entities/User/UserSlice";


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

    const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setName(formData.email));
        dispatch(userAuthorize(formData));
    }

    return (
        <form noValidate onSubmit={onSubmitForm}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>
            </div>
            <button type="submit">Send</button>
        </form>
    )
}

export default UserAuthorizationForm
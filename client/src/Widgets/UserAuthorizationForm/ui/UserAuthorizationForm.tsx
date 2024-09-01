import React, {useState} from 'react';
import {useAppDispatch} from "../../../Shared/storeHooks";
import {setName} from "../../../Entities/User/UserSlice";

type authorizationForm = {
    userName: string,
}
const UserAuthorizationForm: React.FC = () => {

    const [formData, setFormData] = useState<authorizationForm>({
        userName: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const dispatch = useAppDispatch();

    const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setName(formData.userName));
    }

    return (
        <form noValidate onSubmit={onSubmitForm}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="userName"
                    id="email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
            </div>
            <button type="submit">Send</button>
        </form>
    )
}

export default UserAuthorizationForm
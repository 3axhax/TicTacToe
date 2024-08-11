import React from 'react';

const UserAuthorizationForm: React.FC = () => {
    return (
        <form noValidate>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
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
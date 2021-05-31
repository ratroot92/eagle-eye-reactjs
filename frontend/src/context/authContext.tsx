/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { NotificationContainer } from 'react-notifications';
// import AdminService from '../services/AdminService';
// import loader from '../assets/svgs/loader.svg';
import 'react-notifications/lib/notifications.css';
import { BoxLoading } from 'react-loadingg';
import userService from 'service/userService';
interface IUser {
    username: string;
    password: string;
    email: string;
    role: string | number;
    [key: string]: any;
}
interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: any;
    user: IUser;
    setUser: any;
}

export const AuthContext = React.createContext<AuthContextProps | null>(
    null,
) as React.Context<AuthContextProps>;

export default ({ children }) => {
    const [user, setUser] = React.useState<IUser>({
        username: '',
        email: '',
        password: '',
        role: '',
    });
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        let getUser = JSON.parse(localStorage.getItem('user') || '{}');

        userService
            .userIsAuthenticated(getUser)
            .then(({ success, data }) => {
                if (success) {
                    setUser(data);
                    setIsAuthenticated(true);
                    setLoad(true);
                } else {
                    setLoad(true);
                }
            })
            .catch(err => {
                console.log('====================================');
                console.log(err);
                console.log('====================================');
                setLoad(true);
            });
    }, []);
    return (
        <div>
            {!load ? (
                // <img
                //     src={loader}
                //     alt="logo"
                //     style={{
                //         width: '300px',
                //         height: '300px,',
                //         position: 'absolute',
                //         top: '50%',
                //         left: '50%',
                //         margin: '-150px 0 0 -150px',
                //     }}
                // />
                <BoxLoading />
            ) : (
                <AuthContext.Provider
                    value={{
                        user,
                        isAuthenticated,
                        setIsAuthenticated,
                        setUser,
                    }}
                >
                    {children}
                    <NotificationContainer />
                </AuthContext.Provider>
            )}
        </div>
    );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { NotificationContainer } from 'react-notifications';
// import AdminService from '../services/AdminService';
// import loader from '../assets/svgs/loader.svg';
import 'react-notifications/lib/notifications.css';
import { BoxLoading } from 'react-loadingg';
interface IUser {
    isAuthenticated: boolean;
    username: string;
    email: string;
    role: string | number;
    [key: string]: any;
}
interface AuthContextProps {
    isAuthenticated: boolean;
    user: IUser;
}

export const AuthContext = React.createContext<AuthContextProps | null>(
    null,
) as React.Context<AuthContextProps>;

export default ({ children }) => {
    const [user, setUser] = React.useState<IUser>({
        username: '',
        email: '',
        isAuthenticated: false,
        role: '',
    });
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        setIsAuthenticated(true);
        setLoad(true);
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
                        // setIsAuthenticated,
                    }}
                >
                    {children}
                    <NotificationContainer />
                </AuthContext.Provider>
            )}
        </div>
    );
};

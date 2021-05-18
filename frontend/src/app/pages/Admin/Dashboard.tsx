import React from 'react';
import Sidebar from './Sidebar';
import AddUser from './pages/AddUser';
import AllUser from './pages/AllUser';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'hoc/PrivateRoute';
export default function Dashboard(props) {
    const routes = [
        {
            path: '/admin/add-user',
            // sidebar: () => <Sidebar {...props} />,
            main: () => <AddUser {...props} />,
            exact: true,
            roles: [1, 2],
        },
        {
            path: '/admin/all-users',
            // sidebar: () => <Sidebar {...props} />,
            main: () => <AllUser {...props} />,
            exact: true,
            roles: [1, 2],
        },
    ];
    return (
        // <div className="row  h-100">
        //     <div className="col-md-3">
        //         <Sidebar />
        //     </div>

        //     <div className="col-md-9 bg-dark">
        //         {routes.map(route => (
        //             <PrivateRoute
        //                 key={route.path}
        //                 path={route.path}
        //                 exact={route.exact}
        //                 component={route.main}
        //                 roles={route.roles}
        //             />
        //         ))}
        //     </div>
        // </div>
        <div className="row  h-100">
            <div className="col-md-12">
                <Sidebar />

                {routes.map(route => (
                    <PrivateRoute
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                        roles={route.roles}
                    />
                ))}
            </div>
        </div>
    );
}

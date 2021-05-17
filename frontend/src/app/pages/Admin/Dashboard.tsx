import React from 'react';
import Sidebar from './Sidebar';
import AddUser from './pages/AddUser';
import AllUser from './pages/AllUser';
import { Route, Switch } from 'react-router-dom';
export default function Dashboard() {
    return (
        <div>
            <Sidebar />
        </div>
    );
}

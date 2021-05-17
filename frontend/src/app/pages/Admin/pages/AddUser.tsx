import React from 'react';
import AdminSidebarWrapper from './AdminSidebarWrapper';
export default function AddUser() {
    const Content = () => <div>Add User</div>;
    return (
        <>
            <AdminSidebarWrapper Component={Content} />
        </>
    );
}

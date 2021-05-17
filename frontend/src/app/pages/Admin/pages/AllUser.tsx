import React from 'react';
import AdminSidebarWrapper from './AdminSidebarWrapper';
export default function AllUser() {
    const Content = () => <div>All User</div>;
    return (
        <>
            <AdminSidebarWrapper Component={Content} />
        </>
    );
}

import React from 'react';
import Sidebar from './../Sidebar';
export default function AdminSidebarWrapper({ Component }) {
    return (
        <div className="row">
            <Sidebar />

            <div className="col-md-9 border border-danger">
                <Component />
            </div>
        </div>
    );
}

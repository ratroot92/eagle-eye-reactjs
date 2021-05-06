import React from 'react';

export default function FormWrapper({ title, ChildForm }) {
  return (
    <div className="card border bg-dark ">
      <div className="card-header text-white font-weight-bold">{title}</div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 ">{ChildForm}</div>
        </div>
      </div>
      <div className="card-footer"></div>
    </div>
  );
}

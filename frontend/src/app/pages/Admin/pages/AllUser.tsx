/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { BoxLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faUpload,
    faEye,
    faCheck,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/configureStore';
import { History, LocationState } from 'history';
// import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { User } from 'types/User';
import { startEditUser, startSetUser } from 'actions/User';
import userService from 'service/userService';
import * as FaIcons from 'react-icons/fa';

/**
 * All Target Table Start
 */

const AllTargets = props => {
    const dispatch = useDispatch();

    const { data } = props;
    console.log('====================================');
    console.log(data);
    console.log('====================================');

    const deactivateUser = userId => {
        userService
            .deactivateUser(userId)
            .then(({ data, success }) => {
                if (success) {
                    NotificationManager.success('user deactivated successfully');
                    dispatch(startEditUser(data));
                } else {
                    NotificationManager.warning('failed to deactivate user ');
                }
            })
            .catch(err => {
                console.log('====================================');
                console.log(err);
                console.log('====================================');
            });
    };
    const activateUser = userId => {
        userService
            .activateUser(userId)
            .then(({ data, success }) => {
                if (success) {
                    NotificationManager.success('user activated successfully');
                    dispatch(startEditUser(data));
                } else {
                    NotificationManager.warning('failed to activate user ');
                }
            })
            .catch(err => {
                console.log('====================================');
                console.log(err);
                console.log('====================================');
            });
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col text-center">Username</th>
                    <th scope="col text-center">Email</th>
                    <th scope="col text-center">Role</th>
                    <th scope="col text-center">Status</th>
                    <th scope="col text-center">Created at </th>
                    <th scope="col text-center">Operations</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => {
                    return (
                        <tr key={item.id}>
                            <th className="font-12px" scope="row">
                                {item.username}
                            </th>
                            <td className="font-12px">{item.email}</td>
                            <td className="font-12px">{item.role}</td>
                            <td
                                className={`${item.status ? 'text-success' : 'text-warning'
                                    } font-12px`}
                            >
                                {item.status ? 'active' : 'inactive'}
                            </td>
                            <td className={`font-12px`}>{item.created_at}</td>

                            <td className="d-flex flec-row justify-content-around align-items-center">
                                <>
                                    <>
                                        <span className="badge badge-success">
                                            <FaIcons.FaPen
                                                className="p-1"
                                                size={'20'}
                                                color="white"
                                            />
                                        </span>
                                    </>
                                    {item.status === 1 ? (
                                        <span
                                            className="badge badge-danger"
                                            onClick={() => {
                                                deactivateUser(item.id.toString());
                                            }}
                                        >
                                            <FaIcons.FaTrash
                                                className="p-1"
                                                size={'20'}
                                                color="white"
                                            />
                                        </span>
                                    ) : (
                                        <span
                                            className="badge badge-success"
                                            onClick={() => {
                                                activateUser(item.id.toString());
                                            }}
                                        >
                                            <FaIcons.FaTrash
                                                className="p-1"
                                                size={'20'}
                                                color="white"
                                            />
                                        </span>
                                    )}
                                </>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default function AllUser(props) {
    const dispatch = useDispatch();
    const users = useSelector((state: AppState) => state.users);

    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        userService
            .getAllUsers()
            .then(({ data, success }) => {
                if (success) {
                    dispatch(startSetUser(data));

                    setLoad(true);
                    NotificationManager.success('all users successfull');
                } else {
                    dispatch(startSetUser([]));
                    setLoad(true);
                    NotificationManager.warning('all users successfull');
                }
            })
            .catch(err => {
                console.log('====================================');
                console.log(err);
                console.log('====================================');
                NotificationManager.error('something went wrong...');
            });
    }, []);

    return (
        <div>
            {load ? (
                <div className="row">
                    <div className="col-md-12 p-5 ">
                        <div className="card">
                            <div className="card-header">
                                <span className="float-left"></span>{' '}
                                <span className="float-right">
                                    <button
                                        className="btn btn-sm btn-success "
                                        onClick={() => {
                                            props.history.push('/admin/add-user');
                                        }}
                                    >
                                        <FaIcons.FaPlus />
                                    </button>
                                </span>{' '}
                            </div>
                            <div className="card-body">{<AllTargets data={users} />}</div>
                            <div className="card-footer"> </div>
                        </div>
                    </div>
                </div>
            ) : (
                <BoxLoading />
            )}
        </div>
    );
}

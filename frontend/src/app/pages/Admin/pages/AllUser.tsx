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
import { startSetUser } from 'actions/User';
import userService from 'service/userService';

/**
 * All Target Table Start
 */

const AllTargets = props => {
    const { data } = props;
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Target Platform</th>
                    <th scope="col">Username</th>
                    <th scope="col">Target Scheduling</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tweet Count</th>
                    <th scope="col">Operations</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => {
                    return (
                        <tr key={item.id}>
                            <th className="font-12px" scope="row">
                                {item.username}
                            </th>
                            <td className="font-12px">{item.username}</td>
                            <td className="font-12px">{item.email}</td>
                            <td className="font-12px">{item.role}</td>
                            <td
                                className={`${item.status === 'pending' ? 'text-danger' : 'text-success'
                                    } font-12px`}
                            >
                                {item.status}
                            </td>

                            <td className="font-12px">
                                {item.status === 'pending' ? (
                                    <>
                                        <span
                                            className="badge badge-danger"
                                        // onClick={() => {
                                        //     deleteTarget(item.id.toString());
                                        // }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                className=""
                                                size="1x"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    margin: 3,
                                                }}
                                            />
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className="badge badge-success"
                                        // onClick={() => {
                                        //     viewTargetProfile(item);
                                        // }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className=""
                                                size="1x"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    margin: 3,
                                                }}
                                            />
                                        </span>
                                        <span
                                            className="badge badge-danger"
                                        // onClick={() => {
                                        //     deleteTarget(item.id.toString());
                                        // }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                className=""
                                                size="1x"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    margin: 3,
                                                }}
                                            />
                                        </span>
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default function AllUser() {
    const dispatch = useDispatch();
    // const users = useSelector((state: AppState) => state.users);
    const [allusers, setAllUsers] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    React.useEffect(() => {
        userService
            .getAllUsers()
            .then(({ data, success }) => {
                if (success) {
                    dispatch(startSetUser(data));
                    setAllUsers(data);
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
    return <div>{load ? <AllTargets data={allusers} /> : <BoxLoading />}</div>;
}

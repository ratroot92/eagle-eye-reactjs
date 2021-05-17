/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { faCheck, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationManager } from 'react-notifications';
import userService from '../../service/userService';
import { History, LocationState } from 'history';
const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});
interface IComponentProps {
    someOfYourOwnProps: any;
    history: History<LocationState>;
    someMorePropsIfNeedIt: any;
}

export default function LoginFrom(props: IComponentProps) {
    const submit = formData => {
        console.log('====================================');
        console.log(formData);
        console.log('====================================');
        props.history.push('/admin');
        // userService
        //     .login(formData)
        //     .then(resData => {
        //         console.log('====================================');
        //         console.log(resData);
        //         console.log('====================================');
        //     })
        //     .catch(err => {
        //         console.log('====================================');
        //         console.log(err);
        //         console.log('====================================');
        //     });
    };

    /**
     * Form
     */

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: 'asd@gmail.com',
            password: 'pakistan123>',
        },
    });

    return (
        <div className="row  loginFormWrapper">
            <div className="col-4 offset-4 mt-auto mb-auto">
                <div className="card border border-info">
                    <div className="card-body  p-5">
                        <form onSubmit={handleSubmit(submit)}>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h3>Eagle Eye </h3>
                                <p>Login !</p>
                            </div>
                            <div className="input-group input-group-sm ">
                                <input
                                    ref={register}
                                    type="email"
                                    placeholder="@email"
                                    name="email"
                                    className={`custom-form-input form-control form-control-sm border border-
              border border-${errors?.email?.message ? 'danger' : 'success'
                                        } border-width-2`}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        {errors?.email?.message !== undefined ? (
                                            <FontAwesomeIcon icon={faTimes} color="red" />
                                        ) : (
                                            <FontAwesomeIcon icon={faCheck} color="green" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div>
                                {errors.email ? (
                                    <small className="text-danger ml-1">
                                        {errors.email.message}
                                    </small>
                                ) : (
                                    <small className="text-success ml-1">valid</small>
                                )}
                            </div>
                            <div className="input-group input-group-sm mt-5 ">
                                <input
                                    ref={register}
                                    type="password"
                                    placeholder="@password"
                                    name="password"
                                    className={`custom-form-input form-control form-control-sm border border-
              border border-${errors?.password?.message ? 'danger' : 'success'
                                        } border-width-2`}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        {errors?.password?.message !== undefined ? (
                                            <FontAwesomeIcon icon={faTimes} color="red" />
                                        ) : (
                                            <FontAwesomeIcon icon={faCheck} color="green" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div>
                                {errors.password ? (
                                    <small className="text-danger ml-1">
                                        {errors.password.message}
                                    </small>
                                ) : (
                                    <small className="text-success ml-1">valid</small>
                                )}
                            </div>
                            <div className="mt-5 d-flex flex-column justify-content-start align-items-center mt-2">
                                <button className="btn btn-sm btn-success" type="submit">
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Login
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

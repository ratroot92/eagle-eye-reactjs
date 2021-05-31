// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react';
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers';
// import { faCheck, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { NotificationManager } from 'react-notifications';
// import { History, LocationState } from 'history';
// import { useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as authActionCreators from '../../actions/auth';
// import { AppState } from '../../store/configureStore';
// const validationSchema = Yup.object().shape({
//     username: Yup.string().required(),
//     password: Yup.string()
//         .required('No password provided.')
//         .min(8, 'Password is too short - should be 8 chars minimum.')
//         .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
// });
// interface IComponentProps {
//     someOfYourOwnProps: any;
//     history: History<LocationState>;
//     someMorePropsIfNeedIt: any;
// }

// export default function LoginFrom(props: IComponentProps) {
//     const isAuthenticated = useSelector(
//         (state: AppState) => state.auth.isAuthenticated,
//     );
//     const dispatch = useDispatch();
//     const AC = bindActionCreators(authActionCreators, dispatch);
//     const submit = formData => {
//         AC.login(formData.username, formData.password);
//     };

//     /**
//      * Form
//      */

//     const { register, handleSubmit, errors, reset } = useForm({
//         resolver: yupResolver(validationSchema),
//         defaultValues: {
//             username: 'maliksblr92',
//             password: 'pakistan123>',
//         },
//     });

//     return (
//         <div className="row  loginFormWrapper">
//             <div className="col-4 offset-4 mt-auto mb-auto">
//                 <div className="card border border-info">
//                     <div className="card-body  p-5">
//                         <form onSubmit={handleSubmit(submit)}>
//                             <div className="d-flex flex-column justify-content-center align-items-center">
//                                 <h3>Eagle Eye </h3>
//                                 <p>Login !</p>
//                             </div>
//                             <div className="input-group input-group-sm ">
//                                 <input
//                                     ref={register}
//                                     type="username"
//                                     placeholder="@username"
//                                     name="username"
//                                     className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.username?.message ? 'danger' : 'success'
//                                         } border-width-2`}
//                                 />
//                                 <div className="input-group-append">
//                                     <span className="input-group-text">
//                                         {errors?.username?.message !== undefined ? (
//                                             <FontAwesomeIcon icon={faTimes} color="red" />
//                                         ) : (
//                                             <FontAwesomeIcon icon={faCheck} color="green" />
//                                         )}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div>
//                                 {errors.username ? (
//                                     <small className="text-danger ml-1">
//                                         {errors.username.message}
//                                     </small>
//                                 ) : (
//                                     <small className="text-success ml-1">valid</small>
//                                 )}
//                             </div>
//                             <div className="input-group input-group-sm mt-5 ">
//                                 <input
//                                     ref={register}
//                                     type="password"
//                                     placeholder="@password"
//                                     name="password"
//                                     className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.password?.message ? 'danger' : 'success'
//                                         } border-width-2`}
//                                 />
//                                 <div className="input-group-append">
//                                     <span className="input-group-text">
//                                         {errors?.password?.message !== undefined ? (
//                                             <FontAwesomeIcon icon={faTimes} color="red" />
//                                         ) : (
//                                             <FontAwesomeIcon icon={faCheck} color="green" />
//                                         )}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div>
//                                 {errors.password ? (
//                                     <small className="text-danger ml-1">
//                                         {errors.password.message}
//                                     </small>
//                                 ) : (
//                                     <small className="text-success ml-1">valid</small>
//                                 )}
//                             </div>
//                             <div className="mt-5 d-flex flex-column justify-content-start align-items-center mt-2">
//                                 <button className="btn btn-sm btn-success" type="submit">
//                                     <FontAwesomeIcon icon={faUpload} className="mr-2" />
//                   Login
//                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

interface ILoginPrpops {
    login: any;
    isAuthenticated: any;
}

export class Login extends Component<ILoginPrpops> {
    state = {
        username: 'maliksblr92',
        password: 'pakistan123>',
    };

    // static propTypes = {
    //     login: PropTypes.func.isRequired,
    //     isAuthenticated: PropTypes.bool,
    // };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { username, password } = this.state;
        return (
            <div className="row bg-dark" style={{ height: '100vh' }}>
                <div className="col-md-6 m-auto ">
                    <div className="card-img">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <img
                                src="data:image/png;base64,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"
                                alt=""
                                className="card-img"
                                style={{ height: '80px', width: '80px' }}
                            />
                        </div>
                    </div>
                    <div className="card card-body mt-5 pl-5 pr-5 ">
                        <h2 className="text-center">Eagle Login ! </h2>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group mt-2">
                                <label className="text-left">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    onChange={this.onChange}
                                    value={username}
                                />
                            </div>

                            <div className="form-group mt-5">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={this.onChange}
                                    value={password}
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Login
                </button>
                            </div>
                            <p>
                                {/* Don't have an account? <Link to="/register">Register</Link> */}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

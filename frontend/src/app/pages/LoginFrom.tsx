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
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Eagle Login </h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    onChange={this.onChange}
                                    value={username}
                                />
                            </div>

                            <div className="form-group">
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

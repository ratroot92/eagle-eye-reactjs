// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers';
// import * as Yup from 'yup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { BoxLoading } from 'react-loadingg';
// import { NotificationManager } from 'react-notifications';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppState } from 'store/configureStore';
// import FormWrapper from '../../RapidSearch/FormWrapper';
// import userService from '../../../../service/userService';

// import * as FaIcons from 'react-icons/fa';
// /**
//  * Form
//  */

// const validationSchema = Yup.object().shape({
//   username: Yup.string()
//     .required('Username is required ...')
//     .min(5)
//     .max(14)
//     .test('avaliable', 'User already exist', val => {
//       return new Promise(resolve => {
//         if (val !== '') {
//           userService
//             .userAlreadyExist(val)
//             .then(({ success, data }) => {
//               if (success) {
//                 // NotificationManager.warning(
//                 //   ` username ${data}  already exist ...`,
//                 // );
//                 return resolve(false);
//               }
//               return resolve(true);
//             })
//             .catch(err => console.log(err));
//         } else {
//           return resolve(false);
//         }
//       });
//     }),
//   email: Yup.string()
//     .email()
//     .required('Email is required ...')
//     .test('avaliable', 'Email already exist', val => {
//       return new Promise(resolve => {
//         if (val !== '') {
//           userService
//             .userEmailExist(val)
//             .then(({ success, data, message }) => {
//               console.log('====================================');
//               console.log('userEmailExist >> : ', success, data, message);
//               console.log('====================================');
//               if (success) {
//                 // NotificationManager.warning(`email ${data}  already exist ...`);
//                 return resolve(false);
//               }
//               return resolve(true);
//             })
//             .catch(err => console.log(err));
//         } else {
//           return resolve(false);
//         }
//       });
//     }),
//   role: Yup.string().required('Role is required ...'),
//   phone: Yup.string()
//     .required('Phone is required ...')
//     .min(11)
//     .max(11)
//     .test('avaliable', 'Phone already exist', val => {
//       return new Promise(resolve => {
//         if (val !== '') {
//           userService
//             .userPhoneExist(val)
//             .then(({ success, data, message }) => {
//               console.log('====================================');
//               console.log('userPhoneExist >> : ', success, data, message);
//               console.log('====================================');
//               if (success) {
//                 // NotificationManager.warning(`phone ${data}  already exist ...`);
//                 return resolve(false);
//               }
//               return resolve(true);
//             })
//             .catch(err => console.log(err));
//         } else {
//           return resolve(false);
//         }
//       });
//     }),
//   password: Yup.string().required(' Password is required ...').min(8).max(14),
//   c_password: Yup.string().required('Confirm Password is required ...'),
// });
// const AddUserForm = () => {
//   const [load, setLoad] = React.useState(true);
//   const { register, handleSubmit, errors, reset } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       username: 'maliksblr92',
//       email: 'asd@gmail.com',
//       role: '1',
//       phone: '03441500542',
//       password: 'pakistan123>',
//       c_password: 'pakistan123>',
//     },
//   });

//   const submit = formData => {
//     setLoad(false);
//     console.log('====================================');
//     console.log(formData);
//     console.log('====================================');
//     userService
//       .addUser(formData)
//       .then(({ success, data, message }) => {
//         console.log('====================================');
//         console.log(success, data, message);
//         console.log('====================================');
//         if (success) {
//           NotificationManager.success(message);
//         } else {
//           NotificationManager.warning(message);
//         }
//       })
//       .catch(err => {
//         console.log('====================================');
//         console.log(err);
//         console.log('====================================');
//         NotificationManager.error('something went wrong ');
//       });
//     const userObject = {
//       username: 3,
//       email: formData.email,
//       phone: formData.phone,
//       role: parseInt(formData.role),
//       password: formData.password,
//       c_password: formData.c_password,
//     };
//     setLoad(true);
//   };
//   return (
//     <>
//       {load ? (
//         <form onSubmit={handleSubmit(submit)}>
//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label
//                 htmlFor="email"
//                 className="custom-form-label form-control form-control-sm"
//               >
//                 User Name
//               </label>
//             </div>
//             <div className="col-md-9 pl-5 pr-5 ">
//               <div className="input-group input-group-sm ">
//                 <input
//                   ref={register}
//                   type="text"
//                   name="username"
//                   className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.username?.message ? 'danger' : 'success'
//                     } border-width-2`}
//                 // defaultValue=""
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text p-1">
//                     {errors?.username?.message !== undefined ? (
//                       <FontAwesomeIcon icon={faTimes} color="red" />
//                     ) : (
//                       <FontAwesomeIcon icon={faCheck} color="green" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {errors?.username?.message !== '' ? (
//               <>
//                 <div className="col-md-3"></div>
//                 <div className="col-md-9 offset-3 pl-5 pr-5 ">
//                   <p className="font-12px p-0 m-0  text-danger ">
//                     {errors?.username?.message}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/*  */}

//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label
//                 htmlFor="phone"
//                 className="custom-form-label form-control form-control-sm"
//               >
//                 Phone
//               </label>
//             </div>
//             <div className="col-md-9 pl-5 pr-5 ">
//               <div className="input-group input-group-sm ">
//                 <input
//                   ref={register}
//                   type="number"
//                   name="phone"
//                   // defaultValue=""
//                   className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.phone?.message ? 'danger' : 'success'
//                     } border-width-2`}
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text p-1">
//                     {errors?.phone?.message !== undefined ? (
//                       <FontAwesomeIcon icon={faTimes} color="red" />
//                     ) : (
//                       <FontAwesomeIcon icon={faCheck} color="green" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {errors?.phone?.message !== '' ? (
//               <>
//                 <div className="col-md-3"></div>
//                 <div className="col-md-9 offset-3 pl-5 pr-5 ">
//                   <p className="font-12px p-0 m-0  text-danger ">
//                     {errors?.phone?.message}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/*  */}
//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label
//                 htmlFor="email"
//                 className="custom-form-label form-control form-control-sm"
//               >
//                 Email
//               </label>
//             </div>
//             <div className="col-md-9 pl-5 pr-5 ">
//               <div className="input-group input-group-sm ">
//                 <input
//                   ref={register}
//                   // defaultValue=""
//                   type="email"
//                   name="email"
//                   className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.email?.message ? 'danger' : 'success'
//                     } border-width-2`}
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text p-1">
//                     {errors?.email?.message !== undefined ? (
//                       <FontAwesomeIcon icon={faTimes} color="red" />
//                     ) : (
//                       <FontAwesomeIcon icon={faCheck} color="green" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {errors?.email?.message !== '' ? (
//               <>
//                 <div className="col-md-3"></div>
//                 <div className="col-md-9 offset-3 pl-5 pr-5 ">
//                   <p className="font-12px p-0 m-0  text-danger ">
//                     {errors?.email?.message}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/*  */}
//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label
//                 htmlFor="role"
//                 className="custom-form-label form-control form-control-sm"
//               >
//                 Role
//               </label>
//             </div>
//             <div className="col-md-9 pl-5 pr-5 ">
//               <div className="input-group input-group-sm ">
//                 <select
//                   ref={register}
//                   name="role"
//                   className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.role?.message ? 'danger' : 'success'
//                     } border-width-2`}
//                 >
//                   <option value="1">super user</option>
//                   <option value="0">user</option>
//                 </select>
//                 <div className="input-group-append">
//                   <span className="input-group-text p-1">
//                     {errors?.role?.message !== undefined ? (
//                       <FontAwesomeIcon icon={faTimes} color="red" />
//                     ) : (
//                       <FontAwesomeIcon icon={faCheck} color="green" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {errors?.role?.message !== '' ? (
//               <>
//                 <div className="col-md-3"></div>
//                 <div className="col-md-9 offset-3 pl-5 pr-5 ">
//                   <p className="font-12px p-0 m-0  text-danger ">
//                     {errors?.role?.message}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/*  */}
//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label
//                 htmlFor="password"
//                 className="custom-form-label form-control form-control-sm"
//               >
//                 Password
//               </label>
//             </div>
//             <div className="col-md-9 pl-5 pr-5 ">
//               <div className="input-group input-group-sm ">
//                 <input
//                   ref={register}
//                   type="password"
//                   name="password"
//                   // defaultValue=""
//                   className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.password?.message ? 'danger' : 'success'
//                     } border-width-2`}
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text p-1">
//                     {errors?.password?.message !== undefined ? (
//                       <FontAwesomeIcon icon={faTimes} color="red" />
//                     ) : (
//                       <FontAwesomeIcon icon={faCheck} color="green" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {errors?.password?.message !== '' ? (
//               <>
//                 <div className="col-md-3"></div>
//                 <div className="col-md-9 offset-3 pl-5 pr-5 ">
//                   <p className="font-12px p-0 m-0  text-danger ">
//                     {errors?.password?.message}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/*  */}
//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label
//                 htmlFor="c_password"
//                 className="custom-form-label form-control form-control-sm"
//               >
//                 Confirm Password
//               </label>
//             </div>
//             <div className="col-md-9 pl-5 pr-5 ">
//               <div className="input-group input-group-sm ">
//                 <input
//                   ref={register}
//                   type="password"
//                   name="c_password"
//                   // defaultValue=""
//                   className={`custom-form-input form-control form-control-sm border border-
//               border border-${errors?.c_password?.message ? 'danger' : 'success'
//                     } border-width-2`}
//                 />
//                 <div className="input-group-append">
//                   <span className="input-group-text p-1">
//                     {errors?.c_password?.message !== undefined ? (
//                       <FontAwesomeIcon icon={faTimes} color="red" />
//                     ) : (
//                       <FontAwesomeIcon icon={faCheck} color="green" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {errors?.c_password?.message !== '' ? (
//               <>
//                 <div className="col-md-3"></div>
//                 <div className="col-md-9 offset-3 pl-5 pr-5 ">
//                   <p className="font-12px p-0 m-0  text-danger ">
//                     {errors?.c_password?.message}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/*  */}

//           {/*  */}
//           <div className="row mt-2">
//             <div className="col-md-3 "></div>
//             <div className="col-md-9 text-center ">
//               <button className="btn btn-sm btn-success p-1" type="submit">
//                 <FontAwesomeIcon icon={faUpload} className="mr-2" />
//                 Add
//               </button>
//             </div>
//           </div>
//           {/*  */}
//         </form>
//       ) : (
//         <BoxLoading />
//       )}
//     </>
//   );
// };

// export default function AddUser(props) {
//   return (
//     <div className="row">
//       <div className="col-md-12 p-5 ">
//         <div className="card">
//           <div className="card-header">
//             <span className="float-left">Add User </span>
//             <span className="float-right">
//               <button
//                 className="btn btn-sm btn-success "
//                 onClick={() => {
//                   props.history.push('/admin/all-users');
//                 }}
//               >
//                 <FaIcons.FaList />
//               </button>
//             </span>
//           </div>
//           <div className="card-body">{<AddUserForm />}</div>
//           <div className="card-footer"> </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/**
 * Above commented if user form for Mongodb
 * Now i am wrting code for add user
 * for sqlite
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BoxLoading } from 'react-loadingg';
import { NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/configureStore';
import FormWrapper from '../../RapidSearch/FormWrapper';
import userService from '../../../../service/userService';
import * as actionCreators from '../../../../actions/User';
import { bindActionCreators } from 'redux';
import * as FaIcons from 'react-icons/fa';
/**
 * Form
 */

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required ...')
    .min(5)
    .max(14)
    .test('avaliable', 'User already exist', val => {
      return new Promise(resolve => {
        if (val !== '') {
          userService
            .userAlreadyExist(val)
            .then(({ success, data }) => {
              if (success) {
                // NotificationManager.warning(
                //   ` username ${data}  already exist ...`,
                // );
                return resolve(false);
              }
              return resolve(true);
            })
            .catch(err => console.log(err));
        } else {
          return resolve(false);
        }
      });
    }),
  email: Yup.string()
    .email()
    .required('Email is required ...')
    .test('avaliable', 'Email already exist', val => {
      return new Promise(resolve => {
        if (val !== '') {
          userService
            .userEmailExist(val)
            .then(({ success, data, message }) => {
              console.log('====================================');
              console.log('userEmailExist >> : ', success, data, message);
              console.log('====================================');
              if (success) {
                // NotificationManager.warning(`email ${data}  already exist ...`);
                return resolve(false);
              }
              return resolve(true);
            })
            .catch(err => console.log(err));
        } else {
          return resolve(false);
        }
      });
    }),

  password: Yup.string().required(' Password is required ...').min(8).max(14),
  c_password: Yup.string().required('Confirm Password is required ...'),
});
const AddUserForm = () => {
  const [load, setLoad] = React.useState(true);
  const dispatch = useDispatch();
  const AC = bindActionCreators(actionCreators, dispatch);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: 'maliksblr92',
      email: 'asd@gmail.com',
      password: 'pakistan123>',
      c_password: 'pakistan123>',
    },
  });

  const submit = formData => {
    setLoad(false);
    const newUser = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };
    userService
      .addUser(newUser)
      .then(response => {
        console.log('====================================');
        console.log('response', response.user);
        console.log('====================================');
        NotificationManager.success('user added successfully');
        AC.addUser(response.user);
      })
      .catch(err => {
        console.log('====================================');
        console.log('err', err);
        console.log('====================================');
      });
    setLoad(true);
  };

  React.useEffect(() => {
    console.log('====================================');
    console.log('errors', errors);
    console.log('====================================');
  }, [errors]);
  return (
    <>
      {load ? (
        <form onSubmit={handleSubmit(submit)}>
          {/*  */}
          <div className="row mt-2">
            <div className="col-md-3 ">
              <label
                htmlFor="email"
                className="custom-form-label form-control form-control-sm"
              >
                User Name
              </label>
            </div>
            <div className="col-md-9 pl-5 pr-5 ">
              <div className="input-group input-group-sm ">
                <input
                  ref={register}
                  type="text"
                  name="username"
                  className={`custom-form-input form-control form-control-sm border border-
              border border-${errors?.username?.message ? 'danger' : 'success'
                    } border-width-2`}
                // defaultValue=""
                />
                <div className="input-group-append">
                  <span className="input-group-text p-1">
                    {errors?.username?.message !== undefined ? (
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {errors?.username?.message !== '' ? (
              <>
                <div className="col-md-3"></div>
                <div className="col-md-9 offset-3 pl-5 pr-5 ">
                  <p className="font-12px p-0 m-0  text-danger ">
                    {errors?.username?.message}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/*  */}

          {/*  */}
          <div className="row mt-2">
            <div className="col-md-3 ">
              <label
                htmlFor="email"
                className="custom-form-label form-control form-control-sm"
              >
                Email
              </label>
            </div>
            <div className="col-md-9 pl-5 pr-5 ">
              <div className="input-group input-group-sm ">
                <input
                  ref={register}
                  // defaultValue=""
                  type="email"
                  name="email"
                  className={`custom-form-input form-control form-control-sm border border-
              border border-${errors?.email?.message ? 'danger' : 'success'
                    } border-width-2`}
                />
                <div className="input-group-append">
                  <span className="input-group-text p-1">
                    {errors?.email?.message !== undefined ? (
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {errors?.email?.message !== '' ? (
              <>
                <div className="col-md-3"></div>
                <div className="col-md-9 offset-3 pl-5 pr-5 ">
                  <p className="font-12px p-0 m-0  text-danger ">
                    {errors?.email?.message}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/*  */}

          {/*  */}
          <div className="row mt-2">
            <div className="col-md-3 ">
              <label
                htmlFor="password"
                className="custom-form-label form-control form-control-sm"
              >
                Password
              </label>
            </div>
            <div className="col-md-9 pl-5 pr-5 ">
              <div className="input-group input-group-sm ">
                <input
                  ref={register}
                  type="password"
                  name="password"
                  // defaultValue=""
                  className={`custom-form-input form-control form-control-sm border border-
              border border-${errors?.password?.message ? 'danger' : 'success'
                    } border-width-2`}
                />
                <div className="input-group-append">
                  <span className="input-group-text p-1">
                    {errors?.password?.message !== undefined ? (
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {errors?.password?.message !== '' ? (
              <>
                <div className="col-md-3"></div>
                <div className="col-md-9 offset-3 pl-5 pr-5 ">
                  <p className="font-12px p-0 m-0  text-danger ">
                    {errors?.password?.message}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/*  */}
          {/*  */}
          <div className="row mt-2">
            <div className="col-md-3 ">
              <label
                htmlFor="c_password"
                className="custom-form-label form-control form-control-sm"
              >
                Confirm Password
              </label>
            </div>
            <div className="col-md-9 pl-5 pr-5 ">
              <div className="input-group input-group-sm ">
                <input
                  ref={register}
                  type="password"
                  name="c_password"
                  // defaultValue=""
                  className={`custom-form-input form-control form-control-sm border border-
              border border-${errors?.c_password?.message ? 'danger' : 'success'
                    } border-width-2`}
                />
                <div className="input-group-append">
                  <span className="input-group-text p-1">
                    {errors?.c_password?.message !== undefined ? (
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} color="green" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {errors?.c_password?.message !== '' ? (
              <>
                <div className="col-md-3"></div>
                <div className="col-md-9 offset-3 pl-5 pr-5 ">
                  <p className="font-12px p-0 m-0  text-danger ">
                    {errors?.c_password?.message}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/*  */}

          {/*  */}
          <div className="row mt-2">
            <div className="col-md-3 "></div>
            <div className="col-md-9 text-center ">
              <button className="btn btn-sm btn-success p-1" type="submit">
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Add
              </button>
            </div>
          </div>
          {/*  */}
        </form>
      ) : (
        <BoxLoading />
      )}
    </>
  );
};

export default function AddUser(props) {
  return (
    <div className="row">
      <div className="col-md-12 p-5 ">
        <div className="card">
          <div className="card-header">
            <span className="float-left">Add User </span>
            <span className="float-right">
              <button
                className="btn btn-sm btn-success "
                onClick={() => {
                  props.history.push('/admin/all-users');
                }}
              >
                <FaIcons.FaList />
              </button>
            </span>
          </div>
          <div className="card-body">{<AddUserForm />}</div>
          <div className="card-footer"> </div>
        </div>
      </div>
    </div>
  );
}

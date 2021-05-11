/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUpload,
  faEye,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BoxLoading } from 'react-loadingg';
import twitterService from '../../../service/twitterService';
import { NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import {
  startSetTwitterProfileTarget,
  startAddTwitterProfileTarget,
  startDeleteTwitterProfileTarget,
  startEditTwitterProfileTarget,
} from '../../../actions/TwitterProfileTarget';
import { AppState } from 'store/configureStore';
import { History, LocationState } from 'history';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { TwitterProfileTarget } from 'types/TwitterProfileTarget';
interface TwitterCrawlerState {}
interface IComponentProps {
  someOfYourOwnProps: any;
  history: History<LocationState>;
  someMorePropsIfNeedIt: any;
}

/**
 * Form
 */

const validationSchema = Yup.object().shape({
  target_platform: Yup.string().required(),
  target_type: Yup.string().required(),
  target_username: Yup.string()
    .required('Target username is required ...')
    .test('avaliable', 'Target already exist', val => {
      return new Promise(resolve => {
        if (val !== '') {
          twitterService
            .Profiles_Target_Exist(val)
            .then(({ success, data }) => {
              if (success) {
                NotificationManager.warning(
                  `target with username ${data}  already exist ...`,
                  'Twitter Targets',
                );
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
  target_scheduling: Yup.string().required(),
});

export const TwitterProfileTargets = (
  props: TwitterCrawlerState & IComponentProps,
) => {
  const [load, setLoad] = React.useState(true);
  const dispatch = useDispatch();
  // const twitter_profile_targets = useSelector(
  //   (state: AppState) => state.twitter_profile_targets,
  // );
  const twitter_profile_targets = useSelector(
    (state: AppState) => state.twitter_profile_targets,
  );
  React.useEffect(() => {
    twitterService
      .allProfilesTargets()
      .then(resData => {
        console.log('====================================');
        console.log('all_twitter_profiles_targets >> ', resData.data);
        console.log('====================================');
        dispatch(startSetTwitterProfileTarget(resData.data));
        setLoad(true);
      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      });
  }, []);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  /**
   * HELPING FUNCTIONS
   *
   */

  // const socketUrl = 'ws://localhost:8080/ws/abc';
  const socketUrl = 'ws://localhost:8080/ws/test';

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => {
      NotificationManager.success(
        'Django Chanbels Connected ',
        'Celery Notifications',
      );
    },
    onMessage: response => {
      const { data } = response;
      console.log('====================================');
      console.log('Twitter Profile Targets  >> payload >> ', response);
      console.log('====================================');
      if (
        JSON.parse(data).event.type === 'twitter_profile_targets_task_compelete'
      ) {
        dispatch(
          startEditTwitterProfileTarget(
            JSON.parse(data).event.payload.updated_model,
          ),
        );
        NotificationManager.success(
          `Scanning completed for task with username ${
            JSON.parse(data).event.payload.updated_model.target_username
          }`,

          'Celery Notifications',
        );
      } else if (
        JSON.parse(data).event.type === 'twitter_profile_targets_task_failed'
      ) {
        NotificationManager.success(
          `Scanning failed for tweets target with username ${
            JSON.parse(data).event.payload.updated_model.username
          }`,

          'Celery Notifications',
        );
        dispatch(
          startDeleteTwitterProfileTarget(
            JSON.parse(data).event.payload.updated_model.id,
          ),
        );
      }
    },
    onError: error => {
      console.log('====================================');
      console.log('onError', error);
      console.log('====================================');
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: closeEvent => true,
  });
  const viewTargetProfile = (targetData: TwitterProfileTarget) => {
    props.history.push({
      pathname: '/twitter-crawler/twitter-profile-target/view-profile',
      // search: '?query=abc',
      // state: targetData[0].twitter_profile_targets,
      state: targetData,
    });
  };

  const submit = formData => {
    twitterService
      .addTwitterProfileTargets({
        target_username: formData.target_username,
        target_type: formData.target_type,
        target_platform: formData.target_platform,
        target_scheduling: formData.target_scheduling,
      })
      .then(resData => {
        if (resData.success) {
          NotificationManager.success(
            'twitter target added successfully ... ',
            'Twitter Targets',
          );
          console.log('====================================');
          console.log('Saved Target => ', resData.data);
          console.log('====================================');
          dispatch(startAddTwitterProfileTarget(resData.data));
        } else {
          NotificationManager.warning(
            'failed to add twitter target ... ',
            'Twitter Targets',
          );
        }
      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        NotificationManager.error(
          'something went wrong ... ',
          'Twitter Targets',
        );
      });
  };

  const deleteTarget = (id: string) => {
    twitterService
      .deleteProfileTarget(id)
      .then(resData => {
        console.log('====================================');
        console.log(resData);
        console.log('====================================');
        if (resData.success) {
          NotificationManager.success(
            'tweets target deleted successfully ....',
            'Twitter Targets',
          );
          dispatch(startDeleteTwitterProfileTarget(id));
          //run dispatcher here (redux or context)
        } else {
          NotificationManager.success(
            'failed to delete tweets target ....',
            'Twitter Targets',
          );
        }
      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        NotificationManager.success(
          'something went wrong ...',
          'Twitter Targets',
        );
      });
  };

  /**
   * All Target Table Start
   */

  const AllTargets = () => {
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
          {twitter_profile_targets.map(item => {
            return (
              <tr key={item.id}>
                <th className="font-12px" scope="row">
                  {item.target_platform}
                </th>
                <td className="font-12px">{item.target_username}</td>
                <td className="font-12px">{item.target_scheduling}</td>
                <td
                  className={`${
                    item.scanning_status === 'pending'
                      ? 'text-danger'
                      : 'text-success'
                  } font-12px`}
                >
                  {item.scanning_status}
                </td>
                <td className="font-12px">{item.tweets.length || 'n/a'}</td>
                <td className="font-12px">
                  {item.scanning_status === 'pending' ? (
                    <>
                      <span
                        className="badge badge-danger"
                        onClick={() => {
                          deleteTarget(item.id.toString());
                        }}
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
                        onClick={() => {
                          viewTargetProfile(item);
                        }}
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
                        onClick={() => {
                          deleteTarget(item.id.toString());
                        }}
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
  /**
   * All Target table End
   */
  return (
    <div className="row">
      {load ? (
        <>
          <div className="col-md-12  ">
            <div className="card">
              <div className="card-header">Add Profile Target </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(submit)}>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 ">
                      <label
                        htmlFor="target_platform"
                        className={`custom-form-label form-control form-control-sm`}
                      >
                        Target Platform
                      </label>
                    </div>
                    <div className="col-md-9 pl-5 pr-5 ">
                      <input
                        type="text"
                        ref={register}
                        defaultValue="twitter"
                        readOnly
                        className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.target_platform?.message === '' ? 'danger' : 'success'
              } border-width-2`}
                        name="target_platform"
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 ">
                      <label
                        htmlFor="target_platform"
                        className={`custom-form-label form-control form-control-sm`}
                      >
                        Target Type
                      </label>
                    </div>
                    <div className="col-md-9 pl-5 pr-5 ">
                      <input
                        type="text"
                        ref={register}
                        defaultValue="profile_targets"
                        readOnly
                        className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.target_type?.message === '' ? 'danger' : 'success'
              } border-width-2`}
                        name="target_type"
                      />
                    </div>
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 ">
                      <label
                        htmlFor="target_username"
                        className="custom-form-label form-control form-control-sm"
                      >
                        Target Username
                      </label>
                    </div>
                    <div className="col-md-9 pl-5 pr-5 ">
                      <div className="input-group input-group-sm ">
                        <input
                          ref={register}
                          type="text"
                          // required
                          name="target_username"
                          defaultValue="maliksblr92"
                          className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.target_username?.message ? 'danger' : 'success'
              } border-width-2`}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            {errors?.target_username?.message !== undefined ? (
                              <FontAwesomeIcon icon={faTimes} color="red" />
                            ) : (
                              <FontAwesomeIcon icon={faCheck} color="green" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {errors?.target_username?.message !== '' ? (
                      <div className="col-md-9 offset-md-3 pl-5 pr-5 ">
                        <p className="font-12px p-0 m-0  text-danger ">
                          {errors?.target_username?.message}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 ">
                      <label
                        htmlFor="target_username"
                        className="custom-form-label form-control form-control-sm"
                      >
                        Scheduling
                      </label>
                    </div>
                    <div className="col-md-9 pl-5 pr-5 ">
                      <select
                        ref={register}
                        name="target_scheduling"
                        className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.target_scheduling?.message === '' ? 'danger' : 'success'
              } border-width-2`}
                      >
                        <option value="0">0</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                      </select>
                    </div>
                    {errors?.target_scheduling?.message !== '' ? (
                      <div className="col-md-9 offset-md-3">
                        <small className="p-0 m-0 font-weight-bold text-danger ">
                          {errors?.target_scheduling?.message}
                        </small>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/*  */}
                  <div className="row mt-2">
                    <div className="col-md-3 "></div>
                    <div className="col-md-9 pl-5 pr-5 ">
                      <button className="btn btn-sm btn-success" type="submit">
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Add
                      </button>
                    </div>
                  </div>
                  {/*  */}
                </form>
              </div>

              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="card">
              <div className="card-header">All Profiles Targets</div>
              <div className="card-body">
                <AllTargets />
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </>
      ) : (
        <BoxLoading></BoxLoading>
      )}
    </div>
  );
};
export default TwitterProfileTargets;

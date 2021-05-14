/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Space, Switch } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';
import Select from 'react-select';
import twitterService from '../../../service/twitterService';
import { NotificationManager } from 'react-notifications';
import { faEye, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { startAddTwitterTweetsTarget } from '../../../actions/TwitterTweetsTargets';
import { startAddTwitterProfileTarget } from '../../../actions/TwitterProfileTarget';
import moment from 'moment';
import React from 'react';
import ModalImage from 'react-modal-image';
import './styles/TweetsWrapper.css';
import { useCss } from 'react-use';
export default function TweetsWrapper({ tweet, index }) {
  const [showReplies, setShowReplies] = React.useState(false);
  const [showHashtags, setShowHastags] = React.useState(false);
  const [showMentions, setShowMentions] = React.useState(false);

  const {
    id,
    id_str,
    conversation_id,
    datetime,
    datestamp,
    timestamp,
    user_id,
    user_id_str,
    username,
    name,
    place,
    timezone,
    mentions,
    urls,
    photos,
    video,
    text,
    hashtags,
    cashtags,
    replies_count,
    likes_count,
    retweets_count,
    link,
    user_rt_id,
    retweet,
    retweet_id,
    retweet_date,
    quote_url,
    near,
    geo,
    source,
    reply_to,
  } = tweet;
  /**
   * addTarget START
   */
  // Styles
  const AddTargetButton = useCss({
    position: 'relative',
  });
  const dispatch = useDispatch();
  const addTwitterTarget = (username, target_type) => {
    console.log('====================================');
    console.log(target_type);
    console.log('====================================');
    if (target_type === 'tweets_target') {
      twitterService
        .Tweets_Target_Exist(username)
        .then(({ success, data }) => {
          if (success) {
            NotificationManager.warning(
              `target with username ${data}  already exist ...`,
              'Twitter Targets',
            );
          }
          twitterService
            .addTwitterTweetsTargets({
              target_username: username,
              target_type: 'tweets_targets',
              target_platform: 'twitter',
              target_scheduling: 0,
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
                dispatch(startAddTwitterTweetsTarget(resData.data));
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
        })
        .catch(err => console.log(err));
    } else if (target_type === 'profile_target') {
      twitterService
        .Profiles_Target_Exist(username)
        .then(({ success, data }) => {
          if (success) {
            NotificationManager.warning(
              `target with username ${data}  already exist ...`,
              'Profile Targets',
            );
          } else {
            twitterService
              .addTwitterProfileTargets({
                target_username: username,
                target_type: 'profile_targets',
                target_platform: 'twitter',
                target_scheduling: 0,
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
          }
        })
        .catch(err => console.log(err));
    }
  };
  /*
   *addTarget END
   */

  return (
    <div className="col-md-6  mb-2 mt-5">
      <div className="card">
        <div className={` card-header `}>
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex flex-row justify-content-start align-items-center">
                <div className="dropdown">
                  <button
                    className="badge badge-success dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span className="font-10px">{username}</span>
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                      <span className="font-10px ">Tweets Target</span>
                      <span>
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          className="ml-2"
                          onClick={() => {
                            addTwitterTarget(username, 'tweets_target');
                          }}
                        />
                      </span>
                    </li>
                    <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                      <span className="font-10px ">Profile Target</span>
                      <span>
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          className="ml-2"
                          onClick={() => {
                            addTwitterTarget(username, 'profile_target');
                          }}
                        />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <span className="font-10px  p-1 badge badge-warning d-flex flex-row justify-content-center align-items-center">
                <ClockCircleOutlined
                  style={{
                    color: '#f5222d',
                    marginRight: '3px',
                    fontSize: '10px',
                  }}
                />
                {moment(datestamp, 'YYYYMMDD').fromNow()}
              </span>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-row justify-content-start align-items-center">
                <span className="font-10px  p-1 badge badge-info">
                  Tweet # {++index}
                </span>
              </div>
            </div>
          </div>
        </div>

        {photos && photos.length > 0 ? (
          <div
            className="card-img"
            style={{ height: '300px', overflow: 'auto' }}
          >
            {/* <img src={photos} alt="" className="img-fluid" /> */}
            <ModalImage small={photos} large={photos} alt="click to zoom " />;
          </div>
        ) : (
          <></>
        )}

        <div
          className="card-body  p-2 d-flex flex-column justify-content-start align-items-start "
          style={{ height: '250px' }}
        >
          <p className="font-14px  p-4">{text}</p>
        </div>
        <div className="card-body  p-2 d-flex flex-column justify-content-start align-items-start ">
          {retweet === true ? (
            <p className="font-12px  p-0">Re tweeted</p>
          ) : (
            <></>
          )}
        </div>

        {/* Replies Start */}

        <div className="card-body  ">
          {reply_to?.length > 0 ? (
            <div className="row">
              <div className="col-md-12 ">
                <Switch
                  checkedChildren="hide"
                  unCheckedChildren="replies"
                  defaultChecked
                  checked={showReplies}
                  onChange={() => {
                    setShowReplies(!showReplies);
                  }}
                />
              </div>
              <div className="col-md-12">
                <div className="row">
                  {reply_to?.length > 0 &&
                    reply_to.map((item, index) => {
                      return (
                        <div
                          className=" col-md-3 "
                          key={'replies_' + index + item.screen_name}
                        >
                          {showReplies ? (
                            <div className="dropdown">
                              <button
                                className="badge badge-success dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                              >
                                <span className="font-10px">
                                  {item.screen_name}
                                </span>
                                <span className="caret"></span>
                              </button>
                              <ul className="dropdown-menu">
                                <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                                  <span className="font-10px ">
                                    Tweets Target
                                  </span>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faPlusSquare}
                                      className="ml-2"
                                      onClick={() => {
                                        addTwitterTarget(
                                          item.screen_name,
                                          'tweets_target',
                                        );
                                      }}
                                    />
                                  </span>
                                </li>
                                <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                                  <span className="font-10px ">
                                    Profile Target
                                  </span>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faPlusSquare}
                                      className="ml-2"
                                      onClick={() => {
                                        addTwitterTarget(
                                          item.screen_name,
                                          'profile_target',
                                        );
                                      }}
                                    />
                                  </span>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Replies End  */}

        {/* Hashtags Start   */}

        <div className="card-body  ">
          {hashtags?.length > 0 ? (
            <div className="row">
              <div className="col-md-12 ">
                <Switch
                  checkedChildren="hide"
                  unCheckedChildren="hashtags"
                  defaultChecked
                  checked={showHashtags}
                  onChange={() => {
                    setShowHastags(!showHashtags);
                  }}
                />
              </div>
              <div className="col-md-12">
                <div className="row">
                  {hashtags?.length > 0 &&
                    hashtags.map((item, index) => {
                      return (
                        <div
                          className=" col-md-3 "
                          key={'hashtags_' + index + item}
                        >
                          {showHashtags ? (
                            <div className="dropdown">
                              <button
                                className="badge badge-success dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                              >
                                <span className="font-10px">{item}</span>
                                <span className="caret"></span>
                              </button>
                              {/* <ul className="dropdown-menu">
                                <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                                  <span className="font-10px ">
                                    Tweets Target
                                  </span>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faPlusSquare}
                                      className="ml-2"
                                      onClick={() => {
                                        addTwitterTarget(
                                          item.screen_name,
                                          'tweets_target',
                                        );
                                      }}
                                    />
                                  </span>
                                </li>
                                <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                                  <span className="font-10px ">
                                    Profile Target
                                  </span>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faPlusSquare}
                                      className="ml-2"
                                      onClick={() => {
                                        addTwitterTarget(
                                          username,
                                          'profile_target',
                                        );
                                      }}
                                    />
                                  </span>
                                </li>
                              </ul> */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Hashtags End    */}
        {/* Mentions Start   */}
        <div className="card-body  ">
          {mentions?.length > 0 ? (
            <div className="row">
              <div className="col-md-12 ">
                <Switch
                  checkedChildren="hide"
                  unCheckedChildren="mentions"
                  defaultChecked
                  checked={showMentions}
                  onChange={() => {
                    setShowMentions(!showMentions);
                  }}
                />
              </div>
              <div className="col-md-12">
                <div className="row">
                  {mentions?.length > 0 &&
                    mentions.map((item, index) => {
                      return (
                        <div
                          className=" col-md-3 "
                          key={'mentions_' + index + item.screen_name}
                        >
                          {showMentions ? (
                            <div className="dropdown">
                              <button
                                className="badge badge-success dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                              >
                                <span className="font-10px">
                                  {item.screen_name}
                                </span>
                                <span className="caret"></span>
                              </button>
                              <ul className="dropdown-menu">
                                <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                                  <span className="font-10px ">
                                    Tweets Target
                                  </span>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faPlusSquare}
                                      className="ml-2"
                                      onClick={() => {
                                        addTwitterTarget(
                                          item.screen_name,
                                          'tweets_target',
                                        );
                                      }}
                                    />
                                  </span>
                                </li>
                                <li className="d-flex flex-row justify-content-between align-items-center pl-1 pr-2">
                                  <span className="font-10px ">
                                    Profile Target
                                  </span>
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faPlusSquare}
                                      className="ml-2"
                                      onClick={() => {
                                        addTwitterTarget(
                                          item.screen_name,
                                          'profile_target',
                                        );
                                      }}
                                    />
                                  </span>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Hashtags End    */}
        {/* Link Start  */}
        {link !== '' ? (
          <div className="card-body  p-2 d-flex flex-column justify-content-start align-items-start ">
            <a
              className="badge badge-success"
              target="_blank"
              href={link}
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              tweet link
            </a>
          </div>
        ) : (
          <></>
        )}
        {/* Links End   */}
        {/* Urls Start  */}

        <div className="card-body  p-2 d-flex flex-column justify-content-start align-items-start ">
          {urls.map((item, index) => {
            return (
              <a
                key={item}
                className="badge badge-success"
                target="_blank"
                href={item}
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                {item}
              </a>
            );
          })}
        </div>

        {/* Urls  End   */}
        {/* VideoStart  */}
        {video === 1 ? (
          <div className="card-body  p-2 d-flex flex-column justify-content-start align-items-start ">
            <p>tweet has video </p>
          </div>
        ) : (
          <></>
        )}
        {/* Video End   */}

        <div className="card-footer d-flex flex-row justify-content-around align-items-start">
          <span className="font-10px badge badge-info">
            Re Tweeted:{retweets_count}
          </span>
          <span className="font-10px badge badge-info">
            Likes Count :{likes_count}
          </span>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Space, Switch } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';
import {
  faTrashAlt,
  faUpload,
  faEye,
  faCheck,
  faPlusSquare,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import React from 'react';
import ModalImage from 'react-modal-image';
import './styles/TweetsWrapper.css';

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

  return (
    <div className="col-md-6  mb-2 mt-5">
      <div className="card">
        <div className="card-header d-flex flex-row justify-content-between align-items-center">
          <span className="font-10px m-0 p-1 badge badge-success">
            {username}
            <FontAwesomeIcon icon={faPlusSquare} className="ml-2" />
          </span>
          <span className="font-10px m-0 p-1 badge badge-warning d-flex flex-row justify-content-center align-items-center">
            <ClockCircleOutlined
              style={{ color: '#f5222d', marginRight: '3px', fontSize: '10px' }}
            />{' '}
            {moment(datestamp, 'YYYYMMDD').fromNow()}
          </span>

          <span className="font-10px m-0 p-1 badge badge-info">
            Tweet # {++index}
          </span>
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
          className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start "
          style={{ height: '250px' }}
        >
          <p className="font-14px m-0 p-4">{text}</p>
        </div>
        <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
          {retweet === true ? (
            <p className="font-12px m-0 p-0">Re tweeted</p>
          ) : (
            <></>
          )}
        </div>
        <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
          {/* Replies Start */}
          <div>
            {reply_to?.length > 0 ? (
              <>
                <div>
                  {' '}
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

                <Space>
                  <div className="">
                    {reply_to?.length > 0 &&
                      reply_to.map((item, index) => {
                        return (
                          <Badge
                            key={item.name}
                            className="site-badge-count-109 mr-2"
                            count={showReplies ? `${item.screen_name}` : 0}
                            style={{ backgroundColor: '#52c41a' }}
                          />
                        );
                      })}
                  </div>
                </Space>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Replies End  */}
        {/* Hashtags Start   */}
        <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
          {hashtags?.length > 0 ? (
            <>
              <div>
                {' '}
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

              <Space>
                <div className="">
                  {hashtags?.length > 0 &&
                    hashtags.map((item, index) => {
                      return (
                        <Badge
                          key={item}
                          className="site-badge-count-109 mr-2"
                          count={showHashtags ? item : 0}
                          style={{ backgroundColor: '#52c41a' }}
                        />
                      );
                    })}
                </div>
              </Space>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* Hashtags End    */}
        {/* Mentions Start   */}
        <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
          {mentions?.length > 0 ? (
            <>
              <div>
                {' '}
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

              <Space>
                <div className="">
                  {mentions?.length > 0 &&
                    mentions.map((item, index) => {
                      return (
                        <Badge
                          key={item.screen_name}
                          className="site-badge-count-109 mr-2"
                          count={showMentions ? item.name : 0}
                          style={{ backgroundColor: '#52c41a' }}
                        />
                      );
                    })}
                </div>
              </Space>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* Hashtags End    */}
        {/* Link Start  */}
        {link !== '' ? (
          <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
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

        <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
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
          <div className="card-body m-0 p-2 d-flex flex-column justify-content-start align-items-start ">
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

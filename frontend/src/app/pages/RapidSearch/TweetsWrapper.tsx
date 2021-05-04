/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export default function TweetsWrapper({ tweet, index }) {
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
    <div className="col-md-6 mb-2 mt-5">
      <div className="card">
        <div className="card-header d-flex flex-row justify-content-between align-items-center">
          <span className="font-10px m-0 p-1 badge badge-success">
            {username}
            <FontAwesomeIcon icon={faPlusSquare} className="ml-2" />
          </span>
          <span className="font-10px m-0 p-1 badge badge-warning">
            {moment(datestamp, 'YYYYMMDD').fromNow()}
          </span>

          <span className="font-10px m-0 p-1 badge badge-info">{++index}</span>
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
          className="card-body m-0 p-2 d-flex flex-row justify-content-start align-items-start "
          style={{ height: '250px' }}
        >
          <p className="font-12px m-0 p-0">{text}</p>
        </div>
        <div className="card-body m-0 p-2 d-flex flex-row justify-content-start align-items-start ">
          {retweet === true ? (
            <p className="font-12px m-0 p-0">Re tweeted</p>
          ) : (
            <></>
          )}

          <div></div>
        </div>
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

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
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BoxLoading } from 'react-loadingg';
import twitterService from '../../../service/twitterService';
import { NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import {
  startSetTwitterTweetsTarget,
  startAddTwitterTweetsTarget,
  startDeleteTwitterTweetsTarget,
} from '../../../actions/TwitterTweetsTargets';
import { AppState } from 'store/configureStore';
import rapidSearchService from 'service/rapidSearchService';
import TweetsWrapper from './TweetsWrapper';

/**
 * Form
 */

const validationSchema = Yup.object().shape({
  target_phrase: Yup.string().required('Target phrase is required ...'),
  tweets_count: Yup.string().required('Field  is required ...'),
});
export default function PhraseSearchForm() {
  const [load, setLoad] = React.useState(true);
  const [loadTweets, setLoadTweets] = React.useState<any[]>([]);
  const [tweets, setTweets] = React.useState<any[]>([]);
  const [toggle, setToggle] = React.useState(false);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
    // defaultValues: {
    //   target_username: 'maliksblr92',
    // },
  });

  /**
   * filter tweets
   */

  const filterTweets = e => {
    console.log('====================================');
    console.log(e.target.value);
    console.log('====================================');
    switch (e.target.value) {
      case '0':
        setLoadTweets(tweets.filter(item => item.photos?.length !== 0));
        break;
      case '1':
        setLoadTweets(tweets.filter(item => item.retweet !== false));
        break;
      case '2':
        setLoadTweets(tweets.filter(item => item.photos?.length === 0));
        break;
      case '3':
        setLoadTweets(tweets.filter(item => item.hashtags?.length === 0));
        break;
      default:
        setLoadTweets(tweets);
    }
  };

  const submit = formData => {
    setLoad(false);
    const radpiSearchObject = {
      search_type: 1,
      target_phrase: formData.target_phrase,
      tweets_count: parseInt(formData.tweets_count),
      tweets_type: formData.tweets_type,
    };
    rapidSearchService
      .twitterRapidSerach(radpiSearchObject)
      .then(resData => {
        console.log('====================================');
        console.log(resData);
        console.log('====================================');
        if (resData.success) {
          NotificationManager.success('operation successfull... ');
          setLoadTweets(resData.data);
          setTweets(resData.data);
          setToggle(true);
          reset();
        } else {
          NotificationManager.warning('operation failed...  ');
        }

        setLoad(true);
      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        NotificationManager.error('something went wrong... ');
        setLoad(true);
      });
  };
  return (
    <>
      {load ? (
        <>
          {!toggle ? (
            <form onSubmit={handleSubmit(submit)}>
              {/*  */}
              <div className="row mt-2">
                <div className="col-md-3 ">
                  <label
                    htmlFor="search_type"
                    className="custom-form-label form-control form-control-sm"
                  >
                    Search Type
                  </label>
                </div>
                <div className="col-md-9 pl-5 pr-5 ">
                  <div className="input-group input-group-sm ">
                    <input
                      ref={register}
                      type="text"
                      name="search_type"
                      className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.search_type?.message ? 'danger' : 'success'
              } border-width-2`}
                      defaultValue={'Phrase Search'}
                      readOnly
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        {errors?.search_type?.message !== undefined ? (
                          <FontAwesomeIcon icon={faTimes} color="red" />
                        ) : (
                          <FontAwesomeIcon icon={faCheck} color="green" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                {errors?.search_type?.message !== '' ? (
                  <div className="col-md-9 offset-md-3 pl-5 pr-5 ">
                    <p className="font-12px p-0 m-0  text-danger ">
                      {errors?.search_type?.message}
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
                    htmlFor="target_phrase"
                    className="custom-form-label form-control form-control-sm"
                  >
                    Target Phrase
                  </label>
                </div>
                <div className="col-md-9 pl-5 pr-5 ">
                  <div className="input-group input-group-sm ">
                    <input
                      ref={register}
                      defaultValue="maliksblr92"
                      type="text"
                      name="target_phrase"
                      className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.target_phrase?.message ? 'danger' : 'success'
              } border-width-2`}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        {errors?.target_phrase?.message !== undefined ? (
                          <FontAwesomeIcon icon={faTimes} color="red" />
                        ) : (
                          <FontAwesomeIcon icon={faCheck} color="green" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                {errors?.target_phrase?.message !== '' ? (
                  <div className="col-md-9 offset-md-3 pl-5 pr-5 ">
                    <p className="font-12px p-0 m-0  text-danger ">
                      {errors?.target_phrase?.message}
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
                    htmlFor="tweets_count"
                    className="custom-form-label form-control form-control-sm"
                  >
                    Fetch Tweets
                  </label>
                </div>
                <div className="col-md-9 pl-5 pr-5 ">
                  <div className="input-group input-group-sm ">
                    <select
                      ref={register}
                      name="tweets_count"
                      className={`custom-form-input form-control form-control-sm border border-
              border border-${
                errors?.tweets_count?.message ? 'danger' : 'success'
              } border-width-2`}
                    >
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">
                        {errors?.tweets_count?.message !== undefined ? (
                          <FontAwesomeIcon icon={faTimes} color="red" />
                        ) : (
                          <FontAwesomeIcon icon={faCheck} color="green" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                {errors?.tweets_count?.message !== '' ? (
                  <div className="col-md-9 offset-md-3 pl-5 pr-5 ">
                    <p className="font-12px p-0 m-0  text-danger ">
                      {errors?.tweets_count?.message}
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
                    htmlFor="tweets_count"
                    className="custom-form-label form-control form-control-sm"
                  >
                    Tweets Type
                  </label>
                </div>
                <div className="col-md-9 pl-5 pr-5 ">
                  <div className="d-flex flex-row justify-content-around align-items-center ">
                    <div className="form-check">
                      <input
                        className="form-check-input "
                        type="radio"
                        name="tweets_type"
                        id="option1"
                        ref={register}
                        value="1"
                        defaultChecked={true}
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="option1"
                      >
                        Image & Text
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input "
                        type="radio"
                        name="tweets_type"
                        id="option2"
                        ref={register}
                        value="2"
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="option2"
                      >
                        Image Only
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input "
                        type="radio"
                        name="tweets_type"
                        id="option3"
                        ref={register}
                        value="3"
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="option3"
                      >
                        Text Only
                      </label>
                    </div>
                  </div>
                </div>
                {errors?.tweets_count?.message !== '' ? (
                  <div className="col-md-9 offset-md-3 pl-5 pr-5 ">
                    <p className="font-12px p-0 m-0  text-danger ">
                      {errors?.tweets_count?.message}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/*  */}
              {/*  */}
              <div className="row mt-2">
                <div className="col-md-3 "></div>
                <div className="col-md-9 text-center ">
                  <button className="btn btn-sm btn-success" type="submit">
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Search
                  </button>
                </div>
              </div>
              {/*  */}
            </form>
          ) : (
            <div className="row">
              <div className="col-md-12 mb-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  type="button"
                >
                  Search Again{' '}
                </button>
              </div>

              <div className="col-md-3 ">
                <label
                  htmlFor="tweets_count"
                  className="custom-form-label form-control form-control-sm"
                >
                  Filter Tweets
                </label>
              </div>
              <div className="col-md-9 pl-5 pr-5 ">
                <div className="input-group input-group-sm ">
                  <select
                    name="filter"
                    id="filter"
                    className="form-control form-control-sm"
                    onChange={filterTweets}
                  >
                    <option value="">All</option>
                    <option value="0">Images Only Tweets</option>
                    <option value="2">Text Only Tweets</option>
                    <option value="1">Re Tweeted Tweets</option>
                    <option value="3">Hashtags Only</option>
                  </select>
                </div>
              </div>
              {errors?.tweets_count?.message !== '' ? (
                <div className="col-md-9 offset-md-3 pl-5 pr-5 ">
                  <p className="font-12px p-0 m-0  text-danger ">
                    {errors?.tweets_count?.message}
                  </p>
                </div>
              ) : (
                <></>
              )}

              {loadTweets?.length > 0 &&
                loadTweets.map((tweet, index) => {
                  return (
                    <TweetsWrapper index={index} key={tweet.id} tweet={tweet} />
                  );
                })}
            </div>
          )}
        </>
      ) : (
        <BoxLoading></BoxLoading>
      )}
    </>
  );
}

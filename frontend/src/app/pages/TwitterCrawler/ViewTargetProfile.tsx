import { url } from 'inspector';
import React from 'react';
import TweetsWrapper from '../RapidSearch/TweetsWrapper';
import { TwitterProfileTarget } from 'types/TwitterProfileTarget';

export default function ViewTargetProfile(props) {
  console.log('====================================');
  console.log(props.location.state);
  console.log('====================================');
  const [state, setState] = React.useState(props.location.state);
  return (
    <div className="card">
      {/* Start Profile Card Body  */}
      <div className="card-body">
        <div className="row">
          <div
            className="col-md-12"
            style={{
              backgroundImage: `url("${state.profile.background_image}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '250px',
            }}
          >
            {' '}
            <img
              src={state.profile.profile_img_url}
              alt=""
              style={{ height: '50px' }}
              className="img-fluid border border-dark"
            />
          </div>
          {/* Start col-md-6  */}
          <div className="col-md-6">
            {/*  */}
            <div className="row">
              <div className="col-md-3">
                <span className=" text-full-black font-weight-bold font-12px badge ">
                  Name
                </span>
              </div>
              <div className="col-md-9">
                <span className="text-full-black font-weight-bold font-12px badge ">
                  {state.target_username}
                </span>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="row">
              <div className="col-md-3">
                <span className=" text-full-black font-weight-bold font-12px badge ">
                  Followers
                </span>
              </div>
              <div className="col-md-9">
                <span className="text-full-black font-weight-bold font-12px badge ">
                  {state.profile.followers}
                </span>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="row">
              <div className="col-md-3">
                <span className=" text-full-black font-weight-bold font-12px badge ">
                  Following
                </span>
              </div>
              <div className="col-md-9">
                <span className="text-full-black font-weight-bold font-12px badge ">
                  {state.profile.following}
                </span>
              </div>
            </div>
            {/*  */}
          </div>
          {/* End Col-md-6  */}
          {/* Start col-md-6  */}
          <div className="col-md-6">
            {/*  */}
            <div className="row">
              <div className="col-md-3">
                <span className=" text-full-black font-weight-bold font-12px badge ">
                  Twitter Id
                </span>
              </div>
              <div className="col-md-9">
                <span className="text-full-black font-weight-bold font-12px badge ">
                  {state.id}
                </span>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="row">
              <div className="col-md-3">
                <span className=" text-full-black font-weight-bold font-12px badge ">
                  Media Count
                </span>
              </div>
              <div className="col-md-9">
                <span className="text-full-black font-weight-bold font-12px badge ">
                  {state.profile.media}
                </span>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="row">
              <div className="col-md-3">
                <span className=" text-full-black font-weight-bold font-12px badge ">
                  Tweets Count
                </span>
              </div>
              <div className="col-md-9">
                <span className="text-full-black font-weight-bold font-12px badge ">
                  {state.profile.tweets}
                </span>
              </div>
            </div>
            {/*  */}
          </div>
          {/* End Col-md-6  */}
        </div>
      </div>
      {/* End  Profile Card Body  */}
      {/* Start Tweets Card Body  */}
      <div className="card-body">
        <div className="row bg-dark h-100">
          {state.tweets.map((tweet, index) => (
            <TweetsWrapper key={tweet.id} index={index} tweet={tweet} />
          ))}
        </div>
      </div>
      {/* End Tweets Card Body  */}
    </div>
  );
}

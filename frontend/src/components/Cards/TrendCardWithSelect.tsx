import React from 'react';
import { useCss } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { BoxLoading } from 'react-loadingg';
import dashboardService from '../../service/dashboardService';
import moment from 'moment';
export default function TrendsCards({ title }) {
  const [state, setState] = React.useState<any[]>([]);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    dashboardService
      .topTrendsByArea('india')
      .then(resData => {
        setState(resData.data);
      })
      .catch(err => {
        console.log(err);
      });
    setLoad(true);
  }, []);

  const tableStyle = useCss({});
  const tableContainer = useCss({
    height: '350px',
    overflow: 'auto',
  });

  const trendsByArea = e => {
    setLoad(false);
    dashboardService
      .topTrendsByArea(e.target.value)
      .then(resData => {
        console.log('====================================');
        console.log(resData);
        console.log('====================================');
        setState(resData.data);
        setLoad(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="card">
      <div className="card-header ">
        <div className="d-flex flex-row justify-content-around align-items-center">
          <FontAwesomeIcon
            icon={faTwitter}
            className="super-crazy-colors bg-primary p-1  "
            name="rocket"
            size="2x"
            // spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: 'white' }}
          />
          <h4> {title}</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-3">
            <label
              className="form-control form-control-sm w-100 font-14px"
              htmlFor=""
            >
              City
            </label>
          </div>
          <div className="col-md-9">
            <select
              name="area"
              className="form-control form-control-sm w-100"
              onChange={e => {
                trendsByArea(e);
              }}
            >
              <option value="india">india</option>
              <option value="india/ahmedabad">ahmedabad</option>
              <option value="india/amritsar">amritsar</option>
              <option value="india/ahmedabad">ahmedabad</option>
              <option value="india/ahmedabad">ahmedabad</option>
              <option value="india/ahmedabad">ahmedabad</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`card-body m-0 p-0 `}>
        <div className={`${tableContainer}`}>
          {load ? (
            <table className={`${tableStyle}} table table-fixed`}>
              <thead>
                <tr>
                  <th className="font-12px p-1 m-0 " scope="col">
                    Count
                  </th>
                  <th className="font-12px p-1 m-0 " scope="col">
                    Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {state?.length > 0 &&
                  state.map((trend, index) => (
                    <tr
                      key={
                        trend.name +
                        trend.count +
                        +index +
                        title +
                        Math.floor(Math.random() * 100)
                      }
                    >
                      <td className="font-12px font-weight-bold text-danger p-1 m-0 ">
                        {trend.count || 'n/a'}
                      </td>
                      <td className="font-12px text-success p-1 m-0 ">
                        <a
                          className="text-decoration-none"
                          href={trend.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {trend.name || 'n/a'}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <BoxLoading />
          )}
        </div>
      </div>
      <div className="card-footer">
        <FontAwesomeIcon icon={faSync} spin />
        {/* <span className="font-12px p-1 m-0 ">
          Last Synced :
          {moment()
            .startOf(moment().format('MMMM Do YYYY, h:mm:ss a'))
            .fromNow()}
        </span> */}
      </div>
    </div>
  );
}

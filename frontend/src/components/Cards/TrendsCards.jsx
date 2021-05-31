/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useCss } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { BoxLoading } from 'react-loadingg';
import dashboardService from '../../service/dashboardService';
import moment from 'moment';
export default function TrendsCards({ trends, title, setter, state }) {
  const [data, setData] = React.useState(trends);
  // const sortTrends = trendList => {
  //   const data = [];
  //   trendList.forEach(i => {
  //     if (i.count !== 'n/a') {
  //       i.count = parseInt(i.count.replace('k'));
  //       data.push(i);
  //     }
  //   });
  //   data.sort(function (a, b) {
  //     var keyA = a.count,
  //       keyB = b.count;
  //     // Compare the 2 dates
  //     if (keyA > keyB) return -1;
  //     if (keyA < keyB) return 1;
  //     return 0;
  //   });
  //   return data;
  // };

  // React.useEffect(() => {
  //   setData(sortTrends(trends));
  // }, []);

  const tableStyle = useCss({
    // height: '600px!important',
    // border: '1px solid red',
    // '&:hover': {
    //   color: 'blue',
    // },
  });

  const [load, setLoad] = React.useState(true);
  const tableContainer = useCss({
    height: '350px',
    overflow: 'auto',
  });

  const refreshWorldTopTrends = async trendType => {
    if (trendType === 'World Top Trends') {
      setLoad(false);
      const topWorldTrends = await dashboardService.topWorldTrends();
      // setter({
      //   ...state,
      //   worldTrends: sortTrends(topWorldTrends.data),
      // });
      setter({
        ...state,
        worldTrends: topWorldTrends.data,
      });
      setLoad(true);
    } else if (trendType === 'Pakistan Top Trends') {
      setLoad(false);
      const topPakistanTrends = await dashboardService.topPakistanTrends();
      // setter({
      //   ...state,
      //   pakistanTrends: sortTrends(topPakistanTrends.data),
      // });
      setter({
        ...state,
        pakistanTrends: topPakistanTrends.data,
      });
      setLoad(true);
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center font-15px">
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
          <button
            type="button"
            className="btn btn-sm btn-block btn-success"
            onClick={() => {
              refreshWorldTopTrends(title);
            }}
          >
            <FontAwesomeIcon icon={faSync} spin /> Refresh
          </button>
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
                {data &&
                  data.length > 0 &&
                  data.map((trend, index) => (
                    <tr
                      key={
                        trend.name +
                        trend.count +
                        index +
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
            <BoxLoading></BoxLoading>
          )}
        </div>
      </div>
      <div className="card-footer">
        <FontAwesomeIcon icon={faSync} spin />
        <span className="font-12px p-1 m-0 ">
          Last Synced :
          {moment()
            .startOf(moment().format('MMMM Do YYYY, h:mm:ss a'))
            .fromNow()}
        </span>
      </div>
    </div>
  );
}

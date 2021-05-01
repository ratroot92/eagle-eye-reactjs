import React from 'react';
import { useCss } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
export default function TrendsCards({ trends, title }) {
  const tableStyle = useCss({
    // height: '600px!important',
    // border: '1px solid red',
    // '&:hover': {
    //   color: 'blue',
    // },
  });
  const tableContainer = useCss({
    height: '300px',
    overflow: 'auto',
    border: '1px solid green',
    '&:hover': {
      color: 'blue',
    },
  });
  return (
    <div className="card">
      <div className="card-header text-center font-15px">
        {' '}
        <FontAwesomeIcon icon={faTwitter} />
        {title}
      </div>
      <div className={`card-body m-0 p-0 `}>
        <div className={`${tableContainer}`}>
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
              {trends &&
                trends.length > 0 &&
                trends.map(trend => (
                  <tr>
                    <td className="font-12px font-weight-bold text-danger p-1 m-0 ">
                      {trend.count || 'n/a'}
                    </td>
                    <td className="font-12px text-success p-1 m-0 ">
                      {trend.name || 'n/a'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer">
        <FontAwesomeIcon icon={faSync} />
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

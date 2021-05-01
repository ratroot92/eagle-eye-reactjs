import React from 'react';
import { useCss } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import { BoxLoading } from 'react-loadingg';
import dashboardService from '../../service/dashboardService'
export default function TrendsCards({title}) {
    const [state,setState]=React.useState<any[]>([])
    const [load,setLoad]=React.useState(false)
  
    React.useEffect(()=>{
      dashboardService.topTrendsByArea("india").then((resData)=>{
        setState(resData.data)
    }).catch((err)=>{console.log(err)})
    setLoad(true)
    },[])

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

  const trendsByArea =(e)=>{
      setLoad(false)
    dashboardService.topTrendsByArea(e.target.value).then((resData)=>{
        console.log('====================================');
        console.log(resData);
        console.log('====================================');
        setState(resData.data)
        setLoad(true)
    }).catch((err)=>{console.log(err)})
  }
  return (
    <div className="card">
      <div className="card-header text-center font-15px">
       
        <FontAwesomeIcon icon={faTwitter} />
        {title}
        <select name="area" className="form-control form-control-sm" onChange={(e)=>{trendsByArea(e)}}>
            <option value="india">india</option>
            <option value="india/ahmedabad">ahmedabad</option>
            <option value="india/amritsar">amritsar</option>
            <option value="india/ahmedabad">ahmedabad</option>
            <option value="india/ahmedabad">ahmedabad</option>
            <option value="india/ahmedabad">ahmedabad</option>
        </select>
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
            {load ? ( <tbody>
              {state.length > 0 &&
                state.map(trend => (
                  <tr>
                    <td className="font-12px font-weight-bold text-danger p-1 m-0 ">
                      {trend.count || 'n/a'}
                    </td>
                    <td className="font-12px text-success p-1 m-0 ">
                      {trend.name || 'n/a'}
                    </td>
                  </tr>
                ))}
            </tbody>):(<BoxLoading></BoxLoading>)}
           
          </table>
        </div>
      </div>
      <div className="card-footer">
        <FontAwesomeIcon icon={faSync} />
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

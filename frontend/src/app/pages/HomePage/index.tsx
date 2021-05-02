/* eslint-disable react-hooks/exhaustive-deps */
// import * as React from 'react';
// import { Helmet } from 'react-helmet-async';

// export function HomePage() {
//   return (
//     <>
//       <Helmet>
//         <title>Home Page</title>
//         <meta name="description" content="A Boilerplate application homepage" />
//       </Helmet>
//       <span>HomePage container</span>
//     </>
//   );
// }

import Header from 'components/layouts/Header';
import TrendsCards from 'components/Cards/TrendsCards';
import TrendCardWithSelect from 'components/Cards/TrendCardWithSelect';
import React from 'react';
import { BoxLoading } from 'react-loadingg';
import dashboardService from '../../../service/dashboardService';
// const HomePage: React.FC = () => {
export function HomePage() {
  const [load, setLoad] = React.useState(false);
  const [twitterTrends, setTwitterTrends] = React.useState({
    worldTrends: [],
    pakistanTrends: [],
  });

  React.useEffect(() => {
    async function fetchApi() {
      const topWorldTrends = await dashboardService.topWorldTrends();
      const topPakistanTrends = await dashboardService.topPakistanTrends();

      setTwitterTrends({
        ...twitterTrends,
        worldTrends: topWorldTrends.data,
        pakistanTrends: topPakistanTrends.data,
      });
      setLoad(true);
    }
    fetchApi();
  }, []);
  return (
    <div className="row h-100 border border-danger">
      {load ? (
        <>
          <div className="col-md-12 m-0 p-0">
            <Header />
          </div>
          <div className="col-md-4">
            <TrendsCards
              title="World Top Trends"
              trends={twitterTrends.worldTrends || []}
            />
          </div>
          <div className="col-md-4">
            <TrendsCards
              title="Pakistan Top Trends"
              trends={twitterTrends.pakistanTrends || []}
            />
          </div>
          <div className="col-md-4">
            <TrendCardWithSelect title="India Top Trends" />
          </div>
        </>
      ) : (
        <BoxLoading></BoxLoading>
      )}
    </div>
  );
}
export default HomePage;

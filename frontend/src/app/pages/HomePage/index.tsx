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
import TrendsCards from 'components/Cards/TrendsCards';
import TrendCardWithSelect from 'components/Cards/TrendCardWithSelect';
import React from 'react';
import { BoxLoading } from 'react-loadingg';
import dashboardService from '../../../service/dashboardService';
import { url } from 'inspector';
// const HomePage: React.FC = () => {
export function HomePage() {
  const [load, setLoad] = React.useState(false);
  const [loadTrends, setLoadTrends] = React.useState(true);
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
    <div
      className="row"
      style={{
        height: '100vh',
        backgroundImage: `url(${'https://images8.alphacoders.com/473/thumb-1920-473471.jpg'})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {load ? (
        <>
          <div className="col-md-4 mt-5">
            <TrendsCards
              setter={setTwitterTrends}
              state={twitterTrends}
              title="World Top Trends"
              trends={twitterTrends.worldTrends || []}
            />
          </div>
          <div className="col-md-4 mt-5">
            <TrendsCards
              setter={setTwitterTrends}
              state={twitterTrends}
              title="Pakistan Top Trends"
              trends={twitterTrends.pakistanTrends || []}
            />
          </div>
          <div className="col-md-4 mt-5">
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

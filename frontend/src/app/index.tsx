/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { TwitterCrawler } from './pages/TwitterCrawler/Loadable';
import ViewTargetTweets from './pages/TwitterCrawler/ViewTargetTweets';
import ViewTargetProfile from './pages/TwitterCrawler/ViewTargetProfile';
import { TwitterRapidSerach } from './pages/RapidSearch/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import CoronaDashboard from './pages/CoronaDashboard';
import { useTranslation } from 'react-i18next';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export function App(props) {
  const { i18n } = useTranslation();
  return (
    <div className="container-fluid h-100 ">
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Eagle Eye "
          defaultTitle="Eagle Eye "
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A Eagle Eye  application" />
        </Helmet>

        <Switch>
          <Route exact {...props} path="/" component={HomePage} />
          <Route
            exact
            {...props}
            path="/dashboard/corona"
            component={CoronaDashboard}
          />
          <Route
            exact
            {...props}
            path="/twitter-crawler"
            component={TwitterCrawler}
          />
          <Route
            exact
            {...props}
            path="/twitter-crawler/twitter-tweets-target/view-tweets"
            component={ViewTargetTweets}
          />
          <Route
            exact
            {...props}
            path="/twitter-rapid-search"
            component={TwitterRapidSerach}
          />
          <Route
            exact
            {...props}
            path="/twitter-crawler/twitter-profile-target/view-profile"
            component={ViewTargetProfile}
          />

          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
      <NotificationContainer />
    </div>
  );
}

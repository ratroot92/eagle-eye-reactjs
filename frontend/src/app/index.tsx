/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import LoginFrom from './pages/LoginFrom';
import AdminDashboard from './pages/Admin/Dashboard';
import { useTranslation } from 'react-i18next';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Sidebar from './pages/Admin/Sidebar';
/**
 * Admin Imports
 */
import AddUser from './pages/Admin/pages/AddUser';
import AllUser from './pages/Admin/pages/AllUser';
import PrivateRoute from '../hoc/PrivateRoute';
import UnprivateRoute from '../hoc/UnprivateRoute';
import styled from 'styled-components';
export function App(props) {
  const { i18n } = useTranslation();

  const AppWrapper = styled.div`
    height: 100vh;
    overflow-y: auto;
    width: 100vw;
    min-height: 100%;
    padding: 0px;
  `;
  return (
    // <div className="container-fluid">
    <AppWrapper>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Eagle Eye "
          defaultTitle="Eagle Eye "
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A Eagle Eye  application" />
        </Helmet>

        {/*  */}
        <Switch>
          <UnprivateRoute exact {...props} path="/" component={LoginFrom} />
          <PrivateRoute {...props} path="/admin" component={AdminDashboard} />
          {/* <Route exact {...props} path="/" component={HomePage} /> */}
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
    </AppWrapper>
  );
}

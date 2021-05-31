/* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
// import { Link } from 'react-router-dom';
// export default function Header() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarTogglerDemo01"
//         aria-controls="navbarTogglerDemo01"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//         <a className="navbar-brand" href="#">
//           Eagle Eye
//         </a>
//         <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
//           <li className="nav-item active">
//             <Link className="nav-link" to="/twitter-crawler">
//               Twitter Crawler <span className="sr-only">(current)</span>
//             </Link>
//           </li>
//           <li className="nav-item active">
//             <Link className="nav-link" to="/twitter-rapid-search">
//               Rapid Search <span className="sr-only">(current)</span>
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/dashboard/corona">
//               Corona Dashboard <span className="sr-only">(current)</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

interface IHeaderProps {
  logout: any;
  auth: any;
}

export class Header extends Component<IHeaderProps> {
  // static propTypes = {
  //   auth: PropTypes.object.isRequired,
  //   logout: PropTypes.func.isRequired,
  // };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ''}</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div className="row">
        <div className="col-md-12 ">
          <nav className="navbar navbar-expand-sm navbar-light bg-light ">
            <div className="container">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <a className="navbar-brand" href="#">
                  Eagle Eye
                </a>
              </div>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);

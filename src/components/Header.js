import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const LOGIN_STATUS = gql`
  query LoginStatus {
    loginStatus @client {
      isLoggedIn
    }
  }
`;

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <Query query={LOGIN_STATUS}>
        {({ data }) => {
          const { isLoggedIn } = data.loginStatus;
          return (
            <div className="flex pa1 justify-between nowrap orange">
              <div className="flex flex-fixed black">
                <div className="fw7 mr1">Hacker News</div>
                <Link to="/" className="ml1 no-underline black">
                  new
                </Link>
                <div className="ml1">|</div>
                <Link to="/top" className="ml1 no-underline black">
                  top
                </Link>
                <div className="ml1">|</div>
                <Link to="/search" className="ml1 no-underline black">
                  search
                </Link>
                {authToken && (
                  <div className="flex">
                    <div className="ml1">|</div>
                    <Link to="/create" className="ml1 no-underline black">
                      submit
                    </Link>
                  </div>
                )}
                <div className="ml1">|</div>
                <div className="ml1 no-underline black">
                  {isLoggedIn ? "User Login" : "User not Login"}
                </div>
              </div>
              <div className="flex flex-fixed">
                {authToken ? (
                  <div
                    className="ml1 pointer black"
                    onClick={() => {
                      localStorage.removeItem(AUTH_TOKEN);
                      this.props.history.push(`/`);
                    }}
                  >
                    logout
                  </div>
                ) : (
                  <Link to="/login" className="ml1 no-underline black">
                    login
                  </Link>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Header);

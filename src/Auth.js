/* eslint no-restricted-globals: 0 */
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

const LOGIN_SUCCESS = "/secret";
const LOGIN_FAILURE = "/";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "srlc.auth0.com",
    clientID: "LaPLzVMqLOp9NU1ilHbKVF8mCpE4zrJ6",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://srlc.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile"
  });

  //   constructor(){
  // this.login = this.login.bind(this);
  //   }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname = LOGIN_SUCCESS;
      } else if (err) {
        location.pathname = LOGIN_FAILURE;
        console.log(err);
      }
    });
  };

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGIN_FAILURE;
  };

  getProfile = () => {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      return {};
    }
  };
}

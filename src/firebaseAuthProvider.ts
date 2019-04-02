import * as firebase from "firebase/app";
import "firebase/auth";

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";

function log(description: string, obj?: {}) {
  if (ISDEBUG) {
    console.log('FirebaseAuthProvider: ' + description, obj);
  }
}

var ISDEBUG = false;

class AuthClient {
  app: firebase.app.App;
  auth: firebase.auth.Auth;

  constructor(firebaseConfig) {
    log("Auth Client: initializing...");
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
    } else {
      this.app = firebase.app();
    }
    this.auth = firebase.auth();
  }

  async HandleAuthLogin(params) {
    const { username, password } = params;

    try {
      const user = await this.auth.signInWithEmailAndPassword(
        username,
        password
      );
      log("HandleAuthLogin: user sucessfully logged in", { user });
    } catch (e) {
      log("HandleAuthLogin: invalid credentials", { params });
      throw new Error("Login error: invalid credentials");
    }
  }

  async HandleAuthLogout(params) {
    await this.auth.signOut();
  }

  async HandleAuthError(params) {}

  async HandleAuthCheck(params) {
    try {
      const user = await this.getUserLogin();
      log("HandleAuthCheck: user is still logged in", { user });
    } catch (e) {
      log("HandleAuthCheck: ", { e });
    }
  }

  async getUserLogin() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject("User not logged in");
        }
      });
    });
  }
}

function SetUpAuth(config: {}) {
  if (!config) {
    throw new Error('Please pass the Firebase config.json object to the FirebaseAuthProvider');
  }
  ISDEBUG = config['debug'];
  const auth = new AuthClient(config);

  return async (type, params) => {
    log("Auth Event: ", { type, params });
    switch (type) {
      case AUTH_LOGIN:
        await auth.HandleAuthLogin(params);
        break;
      case AUTH_LOGOUT:
        await auth.HandleAuthLogout(params);
        break;
      case AUTH_ERROR:
        await auth.HandleAuthError(params);
        break;
      case AUTH_CHECK:
        await auth.HandleAuthCheck(params);
        break;
      default:
        throw new Error("Unhandled auth type:" + type);
    }
  };
}

export default SetUpAuth;
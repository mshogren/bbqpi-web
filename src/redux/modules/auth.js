import firebase from 'firebase';
import { handleError } from '../uiActions';

const SET_USER_ID = 'bbqpi/auth/SET_USER_ID';

const config = {
  apiKey: 'AIzaSyC7ytk2f7G4PezRda903EaPMuTBLJRZjxg',
  authDomain: 'bbqpi-b8026.firebaseapp.com',
  databaseURL: 'https://bbqpi-b8026.firebaseio.com',
};

firebase.initializeApp(config);

const initialState = {
  authenticated: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET_USER_ID:
    return { authenticated: true, userId: action.payload };

  default:
    return state;
  }
}

export const setUserId = userId => ({
  type: SET_USER_ID,
  payload: userId,
});

export const login = () => (
  (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(() => {}, handleError);
      } else {
        dispatch(setUserId(user.uid));
      }
    });
  });

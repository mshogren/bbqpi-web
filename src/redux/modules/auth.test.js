import firebase from 'firebase';
import reducer, { setUserId, login } from './auth';

jest.mock('firebase', () => {
  const initializeApp = jest.fn();
  const auth = jest.fn();

  return {
    initializeApp,
    auth,
  };
});

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({
    authenticated: false,
  });
});

test('reducer returns state with user id', () => {
  expect(
    reducer(
      {
        authenticated: false,
      },
      setUserId('userId')
    )
  ).toEqual({
    authenticated: true,
    userId: 'userId',
  });
});

test('reducer returns state with user id', () => {
  expect(
    reducer(
      {
        authenticated: true,
        userId: 'oldUserId',
      },
      setUserId('userId')
    )
  ).toEqual({
    authenticated: true,
    userId: 'userId',
  });
});

test('login calls sign in methods if user not logged in', () => {
  const signInWithPopup = jest.fn(
    () =>
      new Promise((resolve) => {
        resolve();
      })
  );
  const onAuthStateChanged = jest.fn((callback) => callback(null));

  firebase.auth.mockImplementation(() => ({
    onAuthStateChanged,
    signInWithPopup,
  }));

  firebase.auth.GoogleAuthProvider = jest.fn();

  const dispatch = jest.fn();

  login()(dispatch);

  expect(firebase.auth).toHaveBeenCalled();
  expect(onAuthStateChanged).toHaveBeenCalled();
  expect(signInWithPopup).toHaveBeenCalled();
  expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled();
  expect(dispatch).not.toHaveBeenCalled();
});

test('login dispatches setUserId action if user is logged in', () => {
  const onAuthStateChanged = jest.fn((callback) => callback({ uid: 'userId' }));

  firebase.auth.mockImplementation(() => ({
    onAuthStateChanged,
  }));

  const dispatch = jest.fn();

  login()(dispatch);

  expect(firebase.auth).toHaveBeenCalled();
  expect(onAuthStateChanged).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'bbqpi/auth/SET_USER_ID',
    payload: 'userId',
  });
});

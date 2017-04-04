import reducer, { setUserId } from './auth';

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({
    authenticated: false,
  });
});

test('reducer returns state with user id', () => {
  expect(reducer({
    authenticated: false,
  }, setUserId('userId'))).toEqual({
    authenticated: true,
    userId: 'userId',
  });
});

test('reducer returns state with user id', () => {
  expect(reducer({
    authenticated: true,
    userId: 'oldUserId',
  }, setUserId('userId'))).toEqual({
    authenticated: true,
    userId: 'userId',
  });
});

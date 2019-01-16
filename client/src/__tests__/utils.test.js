import {formatDate, get, post, patch} from '../helpers/utils';

describe('Testing formatDate', () => {
  it('Should format the date correctly (month under 10)', () => {
    const date = new Date('2019-01-17');
    const expectedResult = '17/01/2019';

    expect(formatDate(date)).toEqual(expectedResult);
  });

  it('Should format the date correctly (month under 10 - long date)', () => {
    const date = new Date('Thu Jan 17 2019 00:00:00 GMT+0100 (Centraleuropæisk normaltid)');
    const expectedResult = '17/01/2019';

    expect(formatDate(date)).toEqual(expectedResult);
  });

  it('Should format the date correctly (month over 10)', () => {
    const date = new Date('2019-11-17');
    const expectedResult = '17/11/2019';

    expect(formatDate(date)).toEqual(expectedResult);
  });

  it('Should return null because of no date input (null)', () => {
    const date = null;
    const expectedResult = null;

    expect(formatDate(date)).toEqual(expectedResult);
  });

  it('Should return null because of no date input (undefined)', () => {
    const date = undefined;
    const expectedResult = null;

    expect(formatDate(date)).toEqual(expectedResult);
  });

  it('Should return null because of no date input (empty string)', () => {
    const date = '';
    const expectedResult = null;

    expect(formatDate(date)).toEqual(expectedResult);
  });

  it('Should return null because of no date input (invalid string)', () => {
    const date = 'njadjkf';
    const expectedResult = null;

    expect(formatDate(date)).toEqual(expectedResult);
  });
});

const json = jest.fn().mockResolvedValue({name: 'Nikolaj', _id: 1234});
global.fetch = jest.fn().mockResolvedValue({
  json
});

describe('Testing get function', () => {
  it('Should return the requested user', async () => {
    const url = '/api/users/1234';
    const user = await get(url);
    expect(user).toEqual({name: 'Nikolaj', _id: 1234});
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(json).toHaveBeenCalled();
  });
});

describe('Testing post function', () => {
  it('Should return the new user', async () => {
    const url = '/api/users';
    const body = {name: 'Nikolaj', _id: 1234};
    const res = await post(url, body);
    expect(res).toEqual(body);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: body,
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    expect(json).toHaveBeenCalledWith();
  });
});

describe('Testing patch function', () => {
  it('Should return the patched user', async () => {
    const url = '/api/users/1234';
    const body = {name: 'Nikolaj', age: 24, _id: 1234};
    const expectedResult = {name: 'Nikolaj', _id: 1234};
    const res = await patch(url, body);
    expect(res).toEqual(expectedResult);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'PATCH',
      body: 'name=Nikolaj&age=24&_id=1234',
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    expect(json).toHaveBeenCalledWith();
  });
});
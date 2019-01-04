import stringify from 'qs-stringify';

export const get = async url => {
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export const post = async (url, body) => {
  const request = await fetch(url, {
    method: 'POST',
    body: body,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  const response = await request.json();
  return response;
};

export const patch = async (url, body) => {
  body = stringify(body);
  console.log(body);
  const request = await fetch(url, {
    method: 'PATCH',
    body: body,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  const response = await request.json();
  return response;
};

export const remove = async url => {
  const request = await fetch(url, {method: 'DELETE'});
  const response = await request.json();
  return response;
};
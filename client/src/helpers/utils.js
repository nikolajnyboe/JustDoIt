import qs from 'qs';

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
  body = qs.stringify(body);
  const request = await fetch(url, {
    method: 'PATCH',
    body: body,
    headers: {
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

export const formatDate = date => {
  if (!date || Object.prototype.toString.call(date) !== "[object Date]") return null;
  date = new Date(date);
  const displayDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const displayMonth = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
  const displayYear = date.getFullYear();
  const fullDisplayDate = `${displayDate}/${displayMonth}/${displayYear}`;
  return fullDisplayDate;
};
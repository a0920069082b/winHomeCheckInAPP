import _ from 'lodash';
import axios from 'axios';
import config from '../config';

// axios.create建立Promise的API連線(Promise是非同步的機制)
const ax = axios.create({
  baseURL: config.api,
  timeout: 60000,
});

function responseData(res) {
  return res.data;
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const error = new Error(res.statusText);
  error.response = res;
  throw error;
}

function generaShortCutMethod(_method) {
  return (_path, _params = {}, _extendOption = {}) => {
    return call(_path, _.toUpper(_method), _params, _extendOption);
  };
}

function call(_path, _method, _params = {}, _extendOption = {}) {
  let option = {
    url: _path,
    method: _method,
  };

  switch (_.toUpper(_method)) {
    case 'PUT':
    case 'POST':
    case 'PATCH':
      option.data = _params;
      break;
    case 'GET':
      option.params = _params;
      break;
    default:
      break;
  }

  option = {
    ...option,
    ..._extendOption,
  };

  return ax
    .request(option)
    .then(checkStatus)
    .then(responseData);
}

export default {
  call,
  get: generaShortCutMethod('GET'),
  post: generaShortCutMethod('POST'),
  put: generaShortCutMethod('PUT'),
  patch: generaShortCutMethod('PATCH'),
  delete: generaShortCutMethod('DELETE'),
};

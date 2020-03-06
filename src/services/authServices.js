import request from '../utils/requestUtils';

export function POST_Login(payload) {
  return request.post('/Auth/Login', payload);
}

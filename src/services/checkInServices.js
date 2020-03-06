import request from '../utils/requestUtils';

export function POST_CheckIn(payload = {}, token) {
  return request.post('/CheckinLogs', payload, {
    headers: {
      Authorization: token,
    },
  });
}

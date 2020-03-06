import {POST_CheckIn} from '../services/checkInServices';
import {getToken} from '../utils/tokenUtils';
import {Alert} from 'react-native';

export default {
  namespace: 'checkIn',
  state: {},
  subscriptions: {},
  effects: {
    *POST_CheckIn({payload, callback, loading}, {call, put}) {
      try {
        const token = yield getToken();

        if (loading) {
          loading(true);
        }

        // 呼叫Services的POST_CheckIn
        const response = yield call(POST_CheckIn, null, token);

        // 將資料儲存至IPAddress ReduxStore
        yield put({type: 'SAVE_IPAddress', payload: response});

        if (callback) {
          callback();
        }
        if (loading) {
          loading(false);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('失敗', '打卡失敗', [{text: '確定'}]);
      }
    },
  },
  reducers: {
    SAVE_IPAddress(state, {payload}) {
      return {
        ...state,
        ipList: payload,
      };
    },
    RESET_ALL() {
      return {};
    },
  },
};

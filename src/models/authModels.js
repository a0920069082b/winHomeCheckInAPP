import {POST_Login} from '../services/authServices';
import {setToken, getToken} from '../utils/tokenUtils';
import {Alert} from 'react-native';

export default {
  // 宣告此models隸屬於哪個namespace
  namespace: 'auth',
  // state資料
  state: {},
  subscriptions: {},
  // 要處理的事件Function
  effects: {
    // 判斷Token是否存在
    *VALIDATE_Token({callback}) {
      const token = yield getToken();
      callback(token ? true : false);
    },
    // 執行Login判斷
    *POST_Login({payload, callback, loading}, {call, put}) {
      try {
        // >= loading !== null && loading !== undefined
        if (loading) {
          loading(true); // 控制畫面的loading
        }
        // 呼叫Services的POST_Login
        // payload為要帶的參數陣列
        const response = yield call(POST_Login, payload);

        // 將資料儲存至UserName ReduxStore
        yield put({type: 'SAVE_UserName', payload: response.user_name});

        // 呼叫tokenUtils的setToken並儲存response.token;
        yield setToken(response.jwtKey);

        if (loading) {
          loading(false); // 關閉畫面的loading
        }
        if (callback) {
          callback(); // 最後執行完之後,要執行的動作
        }
      } catch (error) {
        console.log(error);
        Alert.alert('失敗', 'error', [{text: '確定'}]);
      }
    },
  },
  reducers: {
    SAVE_UserName(state, {payload}) {
      return {
        ...state,
        userName: payload,
      };
    },
    RESET_ALL() {
      return {
        token: undefined,
      };
    },
  },
};

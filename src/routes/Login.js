import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ScrollView,
  findNodeHandle,
} from 'react-native';
import {connect} from 'react-redux';
import {Input, Layout} from '@ui-kitten/components';

//螢幕得長寬的高度
const {height} = Dimensions.get('window');

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    POST_Login(payload, callback, loading) {
      dispatch({type: 'auth/POST_Login', payload, callback, loading});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  class Login extends Component {
    constructor() {
      super();
      this.state = {
        form: {
          username: {
            value: 'admin',
            errorMessage: '請輸入帳號',
          },
          password: {
            value: 'admin',
            errorMessage: '請輸入密碼',
          },
        },
        secureTextEntry: true,
        loading: false,
      };
    }

    _reset() {
      this.refs.scrollView.scrollTo({y: 0});
    }

    _onFocus(refName) {
      setTimeout(() => {
        let scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          findNodeHandle(this.refs[refName]),
          0,
          true,
        );
      }, 100);
    }

    loginSubmit = () => {
      const {POST_Login} = this.props;
      const {form} = this.state;

      // 當API執行完畢後，所要做的事情
      const callback = () => {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'CheckIn'}],
        });
      };

      const loading = bool => this.setState({loading: bool}); // 將bool預設true,將state的loading更改為true

      if (form.username.value.length > 0 && form.password.value.length > 0) {
        POST_Login(
          {
            account_number: form.username.value,
            password: form.password.value,
          },
          callback,
          loading,
        );
      }
    };

    render() {
      const {form, secureTextEntry} = this.state;
      const isUserNameNotEmpty = form.username.value.length > 0 ? true : false;
      const isPassWordNotEmpty = form.password.value.length > 0 ? true : false;

      return (
        <ScrollView ref="scrollView" style={styles.ScrollViewStyle}>
          <Layout style={styles.container}>
            <Layout style={styles.titleLayoutStyle}>
              <View>
                <Image
                  style={styles.imageStyle}
                  source={require('./../assets/winHomeLogo-1.png')}
                />
              </View>
              <View style={styles.titleViewStyle}>
                <Text style={styles.titleTextStyle} category="3">
                  手機差勤
                </Text>
              </View>
            </Layout>

            <Layout style={styles.inputLayoutStyle}>
              <Layout style={styles.inputColumnLayoutStyle}>
                <Layout style={styles.inputRowLayoutStyle} level="1">
                  <Text style={styles.containtTextStyles}>帳 號</Text>
                </Layout>
                <Layout style={styles.inputRowLayoutStyle} level="2">
                  <Input
                    style={styles.inputTextStyles}
                    ref="textInput"
                    status={isUserNameNotEmpty ? 'success' : 'danger'}
                    caption={
                      isUserNameNotEmpty ? '' : form.username.errorMessage
                    }
                    value={form.username.value}
                    placeholder="請輸入帳號"
                    onChangeText={value =>
                      this.setState({
                        form: {...form, username: {...form.username, value}},
                      })
                    }
                    onFocus={this._onFocus.bind(this, 'textInput')}
                  />
                </Layout>
              </Layout>

              <Layout style={styles.inputColumnLayoutStyle}>
                <Layout style={styles.inputRowLayoutStyle} level="1">
                  <Text style={styles.containtTextStyles}>密 碼</Text>
                </Layout>
                <Layout style={styles.inputRowLayoutStyle} level="2">
                  <Input
                    style={styles.inputTextStyles}
                    ref="textInput"
                    status={isPassWordNotEmpty ? 'success' : 'danger'}
                    caption={
                      isPassWordNotEmpty ? '' : form.password.errorMessage
                    }
                    value={form.password.value}
                    placeholder="請輸入密碼"
                    onChangeText={value =>
                      this.setState({
                        form: {...form, password: {...form.password, value}},
                      })
                    }
                    onFocus={this._onFocus.bind(this, 'textInput')}
                    secureTextEntry={secureTextEntry}
                  />
                </Layout>
              </Layout>
            </Layout>
            <Layout style={styles.ButtonLayoutStyle}>
              <TouchableOpacity onPress={this.loginSubmit}>
                <Text style={styles.buttonStyles}>登 入</Text>
              </TouchableOpacity>
            </Layout>
          </Layout>
        </ScrollView>
      );
    }
  },
);

// 建立樣式
const styles = StyleSheet.create({
  ScrollViewStyle: {
    flex: 1,
    marginTop: 0,
    padding: 0,
    height: height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    margin: 0,
    padding: 0,
  },
  titleLayoutStyle: {
    marginTop: -100,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    resizeMode: 'contain',
  },
  titleViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  titleTextStyle: {
    color: '#000',
    fontSize: 35,
  },
  inputLayoutStyle: {
    marginTop: 80,
    flex: 1 / 3,
  },
  inputColumnLayoutStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputRowLayoutStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginTop: 10,
    marginRight: 10,
  },

  inputTextStyles: {
    paddingLeft: 10,
    borderColor: '#AAAAAA',
    height: 35,
    width: 200,
  },
  containtTextStyles: {
    fontSize: 20,
  },

  ButtonLayoutStyle: {
    marginTop: 80,
  },
  buttonStyles: {
    margin: 8,
    width: 260,
    height: 60,
    color: '#FFF',
    backgroundColor: '#82C7D9',
    borderWidth: 0,
    fontSize: 20,
    paddingTop: 18,
    textAlign: 'center',
  },
});

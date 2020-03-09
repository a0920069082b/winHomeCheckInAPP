import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Layout} from '@ui-kitten/components';
import moment from 'moment';
import Hr from 'react-native-hr-component';
import DateTimeClock from '../components/DateTimeClock';
import _ from 'lodash';

const mapStateToProps = state => {
  return {
    userName: _.get(state, 'auth.userName'),
    ipList: _.get(state, 'checkIn.ipList'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    POST_CheckIn(payload, callback, loading) {
      dispatch({type: 'checkIn/POST_CheckIn', payload, callback, loading});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  class CheckIn extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: this.props.userName,
        checkInTime: '',
        checkInStatus: '',
        loading: false,
        clientIP: '',
        serverIP: '',
      };
    }

    checkIn() {
      const {POST_CheckIn} = this.props;
      const callback = () => {
        this.setState({
          checkInStatus: '打卡成功!',
          checkInTime:
            moment().format('YYYY/MM/DD') +
            '      ' +
            moment().format('hh:mm:ss') +
            '      已簽到',
          serverIP: this.props.ipList.serverIP,
          clientIP: this.props.ipList.clientIP,
        });
      };

      const loading = bool => this.setState({loading: bool});
      POST_CheckIn({}, callback, loading);
    }

    render() {
      return (
        <Layout style={styles.container}>
          <Layout style={styles.titleLayoutStyle}>
            <View style={styles.imageViewStyle}>
              <Image
                style={styles.imageStyle}
                source={require('./../assets/winHomeLogo-1.png')}
              />
            </View>
            <View style={styles.titleViewStyle}>
              <Text style={styles.titleTextStyle} category="3">
                {this.state.userName}，您好
              </Text>
            </View>
            <DateTimeClock />
          </Layout>
          <Layout style={styles.ButtonLayoutStyle}>
            <Text style={styles.checkInStatusStyle}>
              {this.state.checkInStatus}
            </Text>
            <TouchableOpacity onPress={() => this.checkIn()}>
              <Text style={styles.buttonStyles}>打 卡</Text>
            </TouchableOpacity>
            <Text style={styles.checkInTimeStyle}>
              {this.state.checkInTime}
            </Text>
            <Text style={styles.checkInTimeStyle}>
              ServerIP: {this.state.serverIP}
            </Text>
            <Text style={styles.checkInTimeStyle}>
              ClientIP: {this.state.clientIP}
            </Text>
          </Layout>
          <Hr
            lineColor="#82C7D9"
            text=""
            thickness={1.5}
            textPadding={0}
            hrStyles={styles.lineStyle}
          />
        </Layout>
      );
    }
  },
);

// 建立樣式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLayoutStyle: {
    marginTop: -10,
  },
  imageViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    resizeMode: 'contain',
  },
  titleViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  titleTextStyle: {
    color: '#000',
    fontSize: 25,
  },
  ButtonLayoutStyle: {
    marginTop: 55,
  },
  checkInStatusStyle: {
    color: '#00BE0E',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonStyles: {
    margin: 8,
    width: 320,
    height: 110,
    fontSize: 32,
    color: '#FFF',
    backgroundColor: '#82C7D9',
    borderWidth: 0,
    paddingTop: 35,
    textAlign: 'center',
  },
  checkInTimeStyle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  lineStyle: {
    marginTop: 40,
    width: 350,
  },
});

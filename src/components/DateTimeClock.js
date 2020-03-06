import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';

class DateTimeClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateNow: moment().format('YYYY/MM/DD'),
      timeNow: moment().format('hh:mm.ss'),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      dateNow: moment().format('YYYY/MM/DD'),
      timeNow: moment().format('hh:mm:ss'),
    });
  }

  render() {
    return (
      <View style={styles.timeViewStyle}>
        <Text style={styles.timeTextStyle}>{this.state.dateNow}</Text>
        <Text style={styles.timeTextStyle}>{this.state.timeNow}</Text>
      </View>
    );
  }
}

// 建立樣式
const styles = StyleSheet.create({
  timeViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  timeTextStyle: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default DateTimeClock;

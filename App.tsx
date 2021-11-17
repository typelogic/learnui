import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  NativeEventEmitter,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import LearnUI from './LearnUI';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

// Enables the button either after 60 seconds using a timer
// or by clicking connect button 
class App1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      flag: false
    }

    // This also enables the transmit button 
    // after 60 seconds
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
  }

  tick() {
    console.log('tick')
    this.setState({
      flag: true
    });

    clearInterval(this.timerID);
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Section title="API">
              <Button title="Connect" onPress={() => {
                console.log("*** connect must be here  ***")
                this.setState({
                  flag: true
                })
              }} />
              <View style={styles.space} />
              <Button title="Dummy" onPress={this.dummy} />
              <View style={styles.space} />
              <Button title="Transmit" disabled={!this.state.flag} onPress={this.transmit} />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  transmit() {
    console.log("+transmit")
    console.log("-transmit")
  }

  dummy() {
    console.log("dummy")      
  }

};

// Enables the transmit button by clicking the connect button 
// which uses useState mechanism
const App2 = () => {

  const [flag, enableFlag] = useState(true);

  const connect = () => {
    console.log("+connect")
    enableFlag(false);
    console.log("-connect")
  }

  const transmit = () => {
    console.log("+transmit")
    console.log("-transmit")
  }

  const dummy = () => {
    console.log("dummy")      
  }

  // For a functional component, this return MUST 
  // be at the end here in order for closure to be 
  // captured
  return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Section title="API">
              <Button title="Connect" onPress={connect} />
              <View style={styles.space} />
              <Button title="Dummy" onPress={dummy} />
              <View style={styles.space} />
              <Button title="Transmit" disabled={flag} onPress={transmit} />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

// Enables the transmit button by clicking the connect button
// which schedules a thread at the native Java side and then
// sends an event using NativeEventEmitter. The event handler
// then sets the state flag to true. This is similar flow via
// using timer.
class App3 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      flag: false
    }
  }

  componentDidMount() {
    const eventEmitter = new NativeEventEmitter();
    this.eventListener = eventEmitter.addListener('MY_EVENT', (event) => {
      console.log(`my event: ${event.what}`);
      this.setState({
        flag: true
      });
    });
  }

  componentWillUnmount() {
    if (this.eventListener) {
      this.eventListener.remove();
    }
  }

  connect() {
    console.log("+connect: Please wait for event to be received.")
    LearnUI.connect("somerandomstring")
    console.log("-connect")
  }

  transmit() {
    console.log("+transmit")
    console.log("-transmit")
  }

  dummy() {
    console.log("dummy")      
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Section title="API">
              <Button title="Connect" onPress={this.connect} />
              <View style={styles.space} />
              <Button title="Dummy" onPress={this.dummy} />
              <View style={styles.space} />
              <Button title="Transmit" disabled={!this.state.flag} onPress={this.transmit} />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  space: {
    width: 20,
    height: 20
  }
});

export default App1; 
//export default App2; 
//export default App3; 

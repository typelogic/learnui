/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
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

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      flag: false
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      9000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    console.log('tick')
    this.setState({
      flag: true
    });
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

  connect() {
    console.log("+connect")

    /*this.setState({
      flag: true
    });*/

    console.log("-connect")
  }

  transmit() {
    console.log("+transmit")
    console.log("-transmit")
  }

  dummy() {
    console.log("dummy")      
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

export default App;

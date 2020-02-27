import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import SocketModuleWrapper from './SocketModuleWrapper';
import ButtonWrapper from 'react-native-button-wrapper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textInputContainer: { flexDirection: 'column', margin: 10 },
  textInput: { height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 5 },
  dataContainer: { height: 80, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 5 },
  button: {height: 45, width: 140, backgroundColor: '#AD0028', borderRadius: 10, marginTop: 20},
  text: { fontSize: 30, color: '#FFF', fontWeight: '700', textAlign: 'center', flex: 1 },
  labelText: {fontSize: 30, color: '#000', fontWeight: '700', textAlign: 'center', marginBottom: 10},
});

class MainApp extends React.Component {
    state = {
        hostname: '',
        port: '',
        data: '',
    }

    onChangeText = (text, type) => {
        this.setState({ [type] : text});
    }

    donePressed = () => {
        const { hostname, port, data } = this.state;
        SocketModuleWrapper.socketConnection({
            printerIpAddress: hostname,
            printerPort: port,
            data,
        },
        () => console.log("Successful"),
        () => console.log("Failure"),
        );
    }

  render() {
      const { hostname, port, data } = this.state;
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelText}>Enter IP Address: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text, 'hostname')}
                    value={hostname}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelText}>Enter port: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text, 'port')}
                    value={port}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.labelText}> Enter data: </Text>
                <TextInput
                    style={styles.dataContainer}
                    onChangeText={text => this.onChangeText(text, 'data')}
                    value={data}
                />
            </View>
        <ButtonWrapper
        style={styles.button}
        onPress={() => this.donePressed()}
        >
            <Text style={styles.text}>DONE</Text>
        </ButtonWrapper>
        </View>
    );
  }
}

export default MainApp;

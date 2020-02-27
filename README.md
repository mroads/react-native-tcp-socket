# React Native Socket Module

![](socket.gif)

Currently browsers does not support connecting to TCP Socket using Javascript.
**React Native Socket Module** is a light weight library that provides feasibility to establish a connection with the socket and allows communication to the application using javascript running on a browser. This is an independent package.

This package exposes a method **sendDataToSocket** to allow communication with the socket.


# Setup
### Installation

`$ npm install react-native-tcp-socket-mroads --save`

or

`$ yarn add react-native-tcp-socket-mroads`


### Usage

On importing the above package, React NativeModules comes up with a TcpSocket module.
This TcpSocket module provides a method **sendDataToSocket**.

sendDataToSocket takes the below parameters for implementation.

| Params           |     Default     |   Mandatory   |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :------: | :---------------------------------------------------------------------------------------------------------- |
|Ip Address     |    |  Yes  |  `String`  | Ip address which is required for connection establishment |
| Port     |   | Yes  |  `String`  | Port number on which server is listening|
| Data     |   | Yes  |  `String`  | Data which needs to be passed on|
| Callback     |   | Yes  |  `Function`  | Callback function that needs to be executed in success or failure scenarios.The first parameter of callback indicates the error and second parameter indicates successful connection.|

### Example
```javascript

import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import SocketModuleWrapper from './SocketModuleWrapper';
import ButtonWrapper from 'react-native-button-wrapper';
import { NativeModules } from 'react-native';

const styles = StyleSheet.create({
  //styles for the screen
});

class MainApp extends React.Component {

    donePressed = () => {
        const { printerIpAddress, printerPort, data } = this.state;
        NativeModules.TcpSocket.sendDataToSocket(
          printerIpAddress,
          +printerPort,
          data,
          (error, response) => {
            const endTime = new Date().getTime();
            if ((endTime - startTime) / 1000 > 4) {
              return;
            }
            if (response) {
              onSuccess && onSuccess(response);
            } else if (error) {
              onError && onError(error);
            }
          },
        );
    }

  render() {
    return (
        <View style={styles.container}>
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

```

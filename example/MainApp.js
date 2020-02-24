import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import SocketModuleWrapper from './SocketModuleWrapper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

class MainApp extends React.Component {
    state = {
        hostname: '',
        port: 0,
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
            <View style={{ flexDirection: 'column', margin: 20 }}>
                <Text>IP Address: </Text>
                <TextInput
                    style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText(text, 'hostname')}
                    value={hostname}
                />
            </View>
            <View style={{ flexDirection: 'column', margin: 20 }}>
                <Text>Port: </Text>
                <TextInput
                    style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText(text, 'port')}
                    value={port}
                />
            </View>
            <View style={{ flexDirection: 'column', margin: 20 }}>
                <Text>Data: </Text>
                <TextInput
                    style={{ height: 80, width: 300, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText(text, 'data')}
                    value={data}
                />
            </View>
            <Button
            title="Done"
          style={{height: 80, width: 250, backgroundColor: '#AD0028'}}
          onPress={() => this.donePressed()}
        />
        </View>
    );
  }
}

export default MainApp;

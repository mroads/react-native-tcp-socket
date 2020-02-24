import React from 'react';
import { NativeModules } from 'react-native';

class SocketModuleWrapper {
    static socketConnection = (printerConfig, onSuccess, onError) => {
        const { printerIpAddress, printerPort, data } = printerConfig;
        const startTime = new Date().getTime();
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
      };
}

export default SocketModuleWrapper;
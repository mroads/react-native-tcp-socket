package com.reactlibrary;
import android.annotation.SuppressLint;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.io.OutputStream;
import java.net.Socket;

public class TcpSocketModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private final String TAG = getName();

    private static final String SUCCESS = "success";

    public TcpSocketModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TcpSocket";
    }

    @ReactMethod
    public void sendDataToSocket(String host, int port, String byteStr, Callback callback) {
        try{
            Runnable runnable = () -> {
                String response = createSocketConnection(host,port, byteStr);
                if (response.equals(SUCCESS)) {
                    callback.invoke(null, response);
                } else {
                    callback.invoke(response, null);
                }
            };
            Thread thread = new Thread(runnable);
            thread.start();
        }catch (Exception e){
            Log.d(TAG, "socketBytes error" + e.getMessage());
            callback.invoke(e.toString(), null);
        }
    }

    private String createSocketConnection(String host, int port, String data) {
        String returnValue = "";
        try {
            Log.i(TAG, " sending data to " + host + " " + port);
            Socket socket = new Socket(host, port);
            OutputStream output = socket.getOutputStream();
            byte[] bytes = android.util.Base64.decode(data, Base64.DEFAULT);
            output.write(bytes);
            socket.close();
            returnValue = SUCCESS;
            return returnValue;
        } catch (Exception e) {
            try {
                Log.e(TAG, "Error " + e.getMessage());
                returnValue = e.getMessage();
                Thread.sleep(1000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
        }
        return returnValue;
    }
}


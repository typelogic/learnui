package com.learnui;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Random;

public class LearnUI extends ReactContextBaseJavaModule {

    private static final String TAG = LearnUI.class.getName();

    public LearnUI(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "LearnUI";
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params)
    {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void init() {
        Log.d(TAG, "[+init]");

        Log.d(TAG, "[-init]");
    }

    static private void PAUSE(int nsec) {
        int pauseSeconds = nsec;
        // Randomize it if not supplied
        if (pauseSeconds  <= 0) {
            Random ran = new Random();
            pauseSeconds = 9 + ran.nextInt(30);
            Log.d(TAG,"pause " + pauseSeconds);
        }

        try {
            Thread.sleep(1000 * pauseSeconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
            Log.e(TAG, "*** SLEEP ERROR ANOMALY ***");
        }
    }

    @ReactMethod
    public void connect(String connectionId) {
        Thread thread = new Thread() {
            public void run() {
                PAUSE(0);
                WritableMap params = Arguments.createMap();
                params.putString("what", "eventdata: ");
                sendEvent(getReactApplicationContext(), "MY_EVENT", params);
            }
        };
        thread.start();
    }
}

package com.prunus.upgrade;

import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

/**
 * Created by weifengzz on 2018/4/27.
 */

public class UpgradeModule extends ReactContextBaseJavaModule {
    public UpgradeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UpgradeAndroid";
    }

    @ReactMethod
    public void download (String url, String filePath) {
        try {
            Toast.makeText(getReactApplicationContext(), "开始下载", Toast.LENGTH_SHORT).show();
            OkHttpUtil.downloadFile(url, new ProgressListener() {
                @Override
                public void onProgress(long currentBytes, long contentLength, boolean done) {
                    int progress = (int) (currentBytes * 100 / contentLength);
                    WritableMap et= Arguments.createMap();
                    et.putInt("progress", progress);
                    sendEvent(getReactApplicationContext(),"downloadListener",et);
                }
            }, new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    WritableMap et= Arguments.createMap();
                    sendEvent(getReactApplicationContext(),"downloadFail",et);
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    if (response != null) {
                        //新建一个File，传入文件夹目录
                        int index = filePath.lastIndexOf("/");
                        File file = new File(filePath.substring(0, index));
                        //判断文件夹是否存在，如果不存在就创建，否则不创建
                        if (!file.exists()) {
                            //通过file的mkdirs()方法创建<span style="color:#FF0000;">目录中包含却不存在</span>的文件夹
                            file.mkdirs();
                        }
                        InputStream is = response.body().byteStream();
                        FileOutputStream fos = new FileOutputStream(new File(filePath));
                        int len = 0;
                        byte[] buffer = new byte[2048];
                        while (-1 != (len = is.read(buffer))) {
                            fos.write(buffer, 0, len);
                        }
                        fos.flush();
                        fos.close();
                        is.close();
                        WritableMap et= Arguments.createMap();
                        et.putString("filePath", filePath);
                        sendEvent(getReactApplicationContext(),"downloadSuccess",et);
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            WritableMap et= Arguments.createMap();
            sendEvent(getReactApplicationContext(),"downloadFail",et);
        }
    }

    /*原生模块可以在没有被调用的情况下往JavaScript发送事件通知。
    最简单的办法就是通过RCTDeviceEventEmitter，
    这可以通过ReactContext来获得对应的引用，像这样：*/
    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap paramss)
    {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, paramss);

    }
}


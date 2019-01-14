package com.prunus.fullScreen;

import android.content.res.Resources;
import android.graphics.Color;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.Method;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

/**
 * http://www.cnblogs.com/lenkevin/p/7676286.html
 */
public class FullScreenModule extends ReactContextBaseJavaModule {
    private ReactContext reactContext;
    public FullScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FullScreenAndroid";
    }

    /**
     * 取消全屏
     */
    @ReactMethod
    public void cancelFullScreen () {
        runOnUiThread(new Runnable() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void run() {
                int flag = View.SYSTEM_UI_FLAG_VISIBLE;
                getCurrentActivity().getWindow().setNavigationBarColor(Color.TRANSPARENT);
                //判断当前版本在4.0以上并且存在虚拟按键，否则不做操作
                if (Build.VERSION.SDK_INT < 19 || !checkDeviceHasNavigationBar()) {
                    //一定要判断是否存在按键，否则在没有按键的手机调用会影响别的功能。如之前没有考虑到，导致图传全屏变成小屏显示。
                    return;
                } else {
                    getCurrentActivity().getWindow().setNavigationBarColor(Color.BLACK);
                    // 获取属性
                    getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(flag);
                }
            }
        });
    }

    /**
     * 通过设置全屏，设置状态栏透明
     *
     */
    @ReactMethod
    public void fullScreen() {
        runOnUiThread(new Runnable() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void run() {
                int flag = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide
//                        | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
                //判断当前版本在4.0以上并且存在虚拟按键，否则不做操作
                if (Build.VERSION.SDK_INT < 19 || !checkDeviceHasNavigationBar()) {
                    //一定要判断是否存在按键，否则在没有按键的手机调用会影响别的功能。如之前没有考虑到，导致图传全屏变成小屏显示。
                    return;
                } else {
                    getCurrentActivity().getWindow().setNavigationBarColor(Color.TRANSPARENT);
                    // 获取属性
                    getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(flag);
                }
            }
        });
    }

    /**
     * 判断是否存在虚拟按键
     * @return
     */
    @ReactMethod
    public boolean checkDeviceHasNavigationBar() {
        boolean hasNavigationBar = false;
        Resources rs = reactContext.getResources();
        int id = rs.getIdentifier("config_showNavigationBar", "bool", "android");
        if (id > 0) {
            hasNavigationBar = rs.getBoolean(id);
        }
        try {
            Class<?> systemPropertiesClass = Class.forName("android.os.SystemProperties");
            Method m = systemPropertiesClass.getMethod("get", String.class);
            String navBarOverride = (String) m.invoke(systemPropertiesClass, "qemu.hw.mainkeys");
            if ("1".equals(navBarOverride)) {
                hasNavigationBar = false;
            } else if ("0".equals(navBarOverride)) {
                hasNavigationBar = true;
            }
        } catch (Exception e) {
        }
        return hasNavigationBar;
    }

}

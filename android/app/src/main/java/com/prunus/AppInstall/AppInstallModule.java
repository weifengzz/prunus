package com.prunus.AppInstall;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppInstallModule extends ReactContextBaseJavaModule {
    public static final int INSTALL_RESULT_CODE = 10001;
    public static String fp = "";
    public AppInstallModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AppInstall";
    }

    /**
     * 安装apk
     * @param filePath
     */
    @ReactMethod
    public void installApk (final String filePath) {
        fp = filePath;
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                //先获取是否有安装未知来源应用的权限
                boolean haveInstallPermission = getReactApplicationContext().getPackageManager().canRequestPackageInstalls();
                if (!haveInstallPermission) {
                    //跳转设置开启允许安装
                    Uri packageURI = Uri.parse("package:"+getReactApplicationContext().getPackageName());
                    Intent intent =new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,packageURI);
//                    intent.putExtra("filePath", filePath);
                    getCurrentActivity().startActivityForResult(intent, INSTALL_RESULT_CODE);
                    return;
                }
            }
            InstallUtil.installApk(filePath, getCurrentActivity());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

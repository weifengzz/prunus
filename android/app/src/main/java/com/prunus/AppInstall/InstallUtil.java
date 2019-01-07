package com.prunus.AppInstall;

import android.app.Activity;
import android.widget.Toast;

import com.maning.updatelibrary.InstallUtils;

public class InstallUtil {
    /**
     * 安装apk
     * @param fp
     */
    public static void installApk (final String fp, Activity activity) {
        try {
            InstallUtils.installAPK(activity, fp, new InstallUtils.InstallCallBack() {
                @Override
                public void onSuccess() {
                    Toast.makeText(activity, "正在安装程序", Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onFail(Exception e) {
                    Toast.makeText(activity, "安装失败:" + e.toString(), Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

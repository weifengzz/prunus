package com.prunus;

import android.support.multidex.MultiDexApplication;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.prunus.download.FileDirReactPackage;
import com.prunus.umeng.DplusReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new LottiePackage(),
            new DplusReactPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new FileDirReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    UMConfigure.init(this, "5c25e138b465f516f70000a4", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
    UMConfigure.setLogEnabled(true);
    MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_UM_NORMAL);
    MobclickAgent.setSessionContinueMillis(1000*40);

    // 微信分享
    PlatformConfig.setWeixin("wxdc1e388c3822c80b", "3baf1193c85774b3fd9d18447d76cab0");
    // 新浪微博分享
    PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad","http://sns.whalecloud.com");
    // QQ分享
    PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");
  }
}

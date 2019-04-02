## Li prunus

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

> Look before you leap。Think first, Program later

<p align="center">
    <img src="https://github.com/weifengzz/prunus/blob/master/images/ss.gif?raw=true" alt="Sample"  width="140" height="250">
    <p align="center">
        <em>功能预览</em>
    </p>
</p>

### app运行说明

```
    1、参考react native官网，安装react native依赖环境
    2、git clone 项目
    3、在项目根目录下执行： yarn 或者 npm install，如果使用yarn 请使用npm单独执行一下：npm install husky －save
    4、执行react-native link
    5、在开发工具下查找eslint插件（此步不是必须的）
    6、执行:react-native run-ios 和 react-native run-android 分别安装ios与安卓
```

### app运行错误解决办法

```
    1、在使用yarn或者npm安装新包之后，android和iOS可能都会报错，报错解决办法如下：
        1）、android：最新版本的android sdk已经弃用了compile导入库的方式，而是使用implementation方式，但是使用‘react-native link’命令后，会默认添加compile导入方式，所以可能导致包的重复引用，在gradle中修改或删除即可，同时若MainActivity中重复link，同样删除即可
        2）、ios：ios在yarn 或者 ‘react-native link’后，可能丢失自定义图标，iconfont.ttf文件，将此文件重新复制导入即可
    2、由于使用lottie-react-native(https://github.com/react-native-community/lottie-react-native/blob/master/docs/api.md)android会出现报错，需要将配置 app下build.gradle，在defaultConfig下添加如下代码：

    defaultConfig {
        ....
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
        ....
    }

```

### app优化办法

```

    1、由于android的targetSdkVersion 已经是27，导入第三方库后，可能第三方库还在使用低版本的，这时android studio会报警告，需要手动进入第三方库源码，修改对应版本号为27即可
    2、关于splash screen的优化，在初始化项目后，启动页可能出现顶部app状态栏显示的问题，影响启动页美观，需要手动改‘react-native-splash-screen’库的源码，修改styles.xml文件如下：
    
    <resources xmlns:tools="http://schemas.android.com/tools">
        <style name="SplashScreen_SplashAnimation">
            <item name="android:windowExitAnimation">@android:anim/fade_out</item>
        </style>

        <style name="SplashScreen_SplashTheme" parent="Theme.ReactNative.AppCompat.Light.NoActionBar.FullScreen">
            <item name="android:statusBarColor" tools:targetApi="lollipop">#ffffff</item>
            <item name="android:windowAnimationStyle">@style/SplashScreen_SplashAnimation</item>
        </style>
        <style name="SplashScreen_Fullscreen" parent="SplashScreen_SplashTheme">
            <item name="android:windowFullscreen">true</item>
        </style>
    </resources>

```

### app注意事项

```
    1、由于react-navigation 使用了最新的 “React Native Gesture Handler”，在使用这个库后，android在MainActivity.class中需要写入如下代码：
    
        @Override
        protected ReactActivityDelegate createReactActivityDelegate() {
            return new ReactActivityDelegate(this, getMainComponentName()) {
                @Override
                protected ReactRootView createRootView() {
                    return new RNGestureHandlerEnabledRootView(MainActivity.this);
                }
            };
        }

```

### 说明

* 本项目是半成品，由于各种原因已停止开发，自我感觉可能还有一些值得分享的地方，故开源，如果能给大家带来一点点启发就足够了
* 本项目暂无继续开发计划，仅供参考
* 项目中涉及到logo的图片、友盟统计key或其它涉及版权或隐私的信息，请勿使用，谢谢！

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
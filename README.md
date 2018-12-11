## Li prunus

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
/**
 * 参考
 * https://www.cnblogs.com/zxxiaoxia/p/6857466.html
 * https://www.cnblogs.com/mengdd/p/3742623.html
 */
package com.prunus.download;

import android.os.Environment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

public class FileDirModule extends ReactContextBaseJavaModule {
    private static final String DIRECTORY_MUSIC_KEY = "DIRECTORY_MUSIC";
    private static final String DIRECTORY_PODCASTS_KEY = "DIRECTORY_PODCASTS";
    private static final String DIRECTORY_RINGTONES_KEY = "DIRECTORY_RINGTONES";
    private static final String DIRECTORY_ALARMS_KEY = "DIRECTORY_ALARMS";
    private static final String DIRECTORY_NOTIFICATIONS_KEY = "DIRECTORY_NOTIFICATIONS";
    private static final String DIRECTORY_PICTURES_KEY = "DIRECTORY_PICTURES";
    private static final String DIRECTORY_MOVIES_KEY = "DIRECTORY_MOVIES";
    private static final String DIRECTORY_DOWNLOADS_KEY = "DIRECTORY_DOWNLOADS";
    private static final String DIRECTORY_DCIM_KEY = "DIRECTORY_DCIM";
    private static final String DIRECTORY_DOCUMENTS_KEY = "DIRECTORY_DOCUMENTS";
    private static final String DOWNLOAD_CACHE_DIRECTION_KEY = "DOWNLOAD_CACHE_DIRECTION";
    private static final String DATA_DIRECTION_KEY = "DATA_DIRECTION";
    private static final String EXTERNAL_STORAGE_DIRECTION_KEY = "EXTERNAL_STORAGE_DIRECTION";
    private static final String EXTERNAL_FILES_DIR_KEY = "EXTERNAL_FILES_DIR";
    private static final String CACHE_DIR_KEY = "CACHE_DIR";
    private static final String FILES_DIR_KEY = "FILES_DIR";
    private static final String EXTERNAL_CACHE_DIR_KEY = "EXTERNAL_CACHE_DIR";

    private ReactContext reactContext;
    public FileDirModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FileDirAndroid";
    }

    /**
     * 下载缓存内容目录
     * @return 路径
     */
    public String getDownloadCacheDirectory () {
        return Environment.getDownloadCacheDirectory().getPath();
    }

    /**
     * 用户数据目录
     * @return 路径
     */
    public String getDataDirectory () {
        return Environment.getDataDirectory().getPath();
    }

    /**
     * 应用外部存储空间（数据文件非私有，可以被手机的系统程序访问（如MP3格式的文件，会被手机系统检索出来），同样，该目录下的文件，所有的APP程序也都是可以访问的，）
     * 这个目录是用来存放各种类型的文件的目录，在这里用户可以分类管理不同类型的文件（例如音乐、图片、电影等）；
     * @return 路径
     */
    public String getExternalStoragePublicDirectory (String type) {
        switch (type) {
            case DIRECTORY_MUSIC_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC).getPath();
            case DIRECTORY_PODCASTS_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PODCASTS).getPath();
            case DIRECTORY_RINGTONES_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_RINGTONES).getPath();
            case DIRECTORY_ALARMS_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_ALARMS).getPath();
            case DIRECTORY_NOTIFICATIONS_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_NOTIFICATIONS).getPath();
            case DIRECTORY_PICTURES_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getPath();
            case DIRECTORY_MOVIES_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES).getPath();
            case DIRECTORY_DOWNLOADS_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getPath();
            case DIRECTORY_DCIM_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).getPath();
            case DIRECTORY_DOCUMENTS_KEY:
                return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS).getPath();
            default:
                return null;
        }
    }

    /**
     * 应用外部存储空间(数据文件私有，系统媒体文件无法访问（例如存了一个MP3文件，通过系统的文件夹管理系统，无法找到）)，
     * 当应用被卸载的时候，目录下的文件会被删除，但是这里和getCacheDir()还有不同之处：
     * 只有手机系统使用的是虚拟外部存储（虚拟SD卡，现在绝大多数的手机，都不用外挂物理SD卡了）的时候，
     * 才可以在卸载应用的同时，自动删除该目录下的文件，如果是之前的物理存储（物理SD卡）则不会自动删除该目录，及目录下的文件。
     * 在使用的时候，需要判断外部存储的挂载状态（getExternalStorageState(File)），还需要申请读写权限（READ_EXTERNAL_STORAGE， WRITE_EXTERNAL_STORAGE）
     * 注：当其他应用拥有SD卡读写权限的时候，可以访问该目录下的文件
     * @return 路径
     */
    public String getExternalStorageDirectory() {
//        System.out.print("Environment.getExternalStorageState() ||| " + Environment.getExternalStorageState().toString());
//        if ("MEDIA_MOUNTED".equals(Environment.getExternalStorageState())) {
//            return Environment.getExternalStorageDirectory().getPath();
//        } else {
//            return null;
//        }
        return Environment.getExternalStorageDirectory().getPath();
    }

    /**
     * 获取私有存储空间
     * @return 路径
     */
    public String getExternalFilesDir () {
        return reactContext.getExternalFilesDir(null).getPath();
    }

    /**
     * 应用内部存储空间（数据文件私有）文件存储到这个路径下，不需要申请权限，当应用被卸载的时候，目录下的文件会被删除。
     * 需要注意的是，这个文件的目录和应用的存储位置有关，
     * 当应用被移动到外部存储设备的时候，文件的绝对路径也是变化的，所以建议当数据存储到这个目录的时候，用相对路径。
     * 这个目录和getFilesDir()目录最大的不同在于：当安卓设备的存储空间少，或者不够用的时候，系统会自动删除这个目录下的文件。
     * 官方建议是，超过1MB的文件，建议存储到getExternalCacheDir()目录下
     * @return 路径
     */
    public String getCacheDir () {
        return reactContext.getCacheDir().getPath();
    }

    /**
     * 应用内部存储空间（数据文件私有）文件存储到这个路径下，不需要申请权限，当应用被卸载的时候，目录下的文件会被删除。
     * 需要注意的是，这个文件的目录和应用的存储位置有关，
     * 当应用被移动到外部存储设备的时候，文件的绝对路径也是变化的，所以建议当数据存储到这个目录的时候，用相对路径
     * 系统提供的访问此路径文件的方法是：context.openFileOutput(String,int);context.openFileInput(String name);
     * @return 路径
     */
    public String getFilesDir () {
        return reactContext.getFilesDir().getPath();
    }

    /**
     * 应用外部存储空间(数据文件私有，系统媒体文件无法访问（例如存了一个MP3文件，通过系统的文件夹管理系统，无法找到）)，
     * 当应用被卸载的时候，目录下的文件会被删除，但是这里和getCacheDir()还有不同之处：
     * 只有手机系统使用的是虚拟外部存储（虚拟SD卡，现在绝大多数的手机，都不用外挂物理SD卡了）的时候，
     * 才可以在卸载应用的同时，自动删除该目录下的文件，如果是之前的物理存储（物理SD卡）则不会自动删除该目录，及目录下的文件。
     * 在使用的时候，需要判断外部存储的挂载状态（getExternalStorageState(File)），还需要申请读写权限（READ_EXTERNAL_STORAGE， WRITE_EXTERNAL_STORAGE）
     * 注：当其他应用拥有SD卡读写权限的时候，可以访问该目录下的文件
     * @return 路径
     */
    public String getExternalCacheDir () {
        return reactContext.getExternalCacheDir().getPath();
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DIRECTORY_MUSIC_KEY, getExternalStoragePublicDirectory(DIRECTORY_MUSIC_KEY));
        constants.put(DIRECTORY_PODCASTS_KEY, getExternalStoragePublicDirectory(DIRECTORY_PODCASTS_KEY));
        constants.put(DIRECTORY_RINGTONES_KEY, getExternalStoragePublicDirectory(DIRECTORY_RINGTONES_KEY));
        constants.put(DIRECTORY_ALARMS_KEY, getExternalStoragePublicDirectory(DIRECTORY_ALARMS_KEY));
        constants.put(DIRECTORY_NOTIFICATIONS_KEY, getExternalStoragePublicDirectory(DIRECTORY_NOTIFICATIONS_KEY));
        constants.put(DIRECTORY_PICTURES_KEY, getExternalStoragePublicDirectory(DIRECTORY_PICTURES_KEY));
        constants.put(DIRECTORY_MOVIES_KEY, getExternalStoragePublicDirectory(DIRECTORY_MOVIES_KEY));
        constants.put(DIRECTORY_DOWNLOADS_KEY, getExternalStoragePublicDirectory(DIRECTORY_DOWNLOADS_KEY));
        constants.put(DIRECTORY_DCIM_KEY, getExternalStoragePublicDirectory(DIRECTORY_DCIM_KEY));
        constants.put(DIRECTORY_DOCUMENTS_KEY, getExternalStoragePublicDirectory(DIRECTORY_DOCUMENTS_KEY));
        constants.put(DOWNLOAD_CACHE_DIRECTION_KEY, getDownloadCacheDirectory());
        constants.put(DATA_DIRECTION_KEY, getDataDirectory());
        constants.put(EXTERNAL_STORAGE_DIRECTION_KEY, getExternalStorageDirectory());
        constants.put(EXTERNAL_FILES_DIR_KEY, getExternalFilesDir());
        constants.put(CACHE_DIR_KEY, getCacheDir());
        constants.put(FILES_DIR_KEY, getFilesDir());
        constants.put(EXTERNAL_CACHE_DIR_KEY, getExternalCacheDir());
        return constants;
    }

}

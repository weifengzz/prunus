package com.prunus.upgrade;

/**
 * Created by weifengzz on 2018/4/26.
 */

public interface ProgressListener {
    void onProgress(long currentBytes, long contentLength, boolean done);
}

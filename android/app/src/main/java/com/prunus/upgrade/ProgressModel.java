package com.prunus.upgrade;
/**
 * Created by weifengzz on 2018/4/26.
 */

public class ProgressModel {
    private boolean isDone;
    private Long currentBytes;
    private Long contentLength;

    public ProgressModel(Long currentBytes, Long contentLength, boolean isDone) {
        this.isDone = isDone;
        this.currentBytes = currentBytes;
        this.contentLength = contentLength;
    }

    public Long getCurrentBytes() {
        return currentBytes;
    }

    public void setCurrentBytes(Long currentBytes) {
        this.currentBytes = currentBytes;
    }

    public Long getContentLength() {
        return contentLength;
    }

    public void setContentLength(Long contentLength) {
        this.contentLength = contentLength;
    }

    public boolean isDone () {
        if (currentBytes == contentLength) {
            return true;
        } else  {
            return false;
        }
    }
}



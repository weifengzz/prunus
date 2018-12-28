/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
/** 初始化友盟所有组件产品
 @param appKey 开发者在友盟官网申请的AppKey.
 @param channel 渠道标识，可设置nil表示"App Store".
 */
+ (void)initWithAppkey:(NSString *)appKey channel:(NSString *)channel;

@end

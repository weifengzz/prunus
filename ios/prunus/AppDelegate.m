/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UMCommon/UMCommon.h>
#import <UMAnalytics/MobClick.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"prunus"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [UMConfigure initWithAppkey:@"5c25e226f1f556e32b00019d" channel:@"App Store"];
  [UMConfigure setLogEnabled:YES];//此处在初始化函数前面是为了打印初始化的日志
  [MobClick setScenarioType:E_UM_NORMAL|E_UM_GAME|E_UM_DPLUS];
  [MobClick setCrashReportEnabled:YES];
  [UMConfigure initWithAppkey:@"your appkey" channel:@"App Store"];
  return YES;
}


@end

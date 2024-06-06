#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeLanguage, NSObject)

RCT_EXTERN_METHOD(getAppLanguage:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setAppLanguage:(NSString *)language
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

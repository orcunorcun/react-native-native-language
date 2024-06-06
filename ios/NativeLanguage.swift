@objc(NativeLanguage)
class NativeLanguage: NSObject {

  // Get the app's current language setting in IETF BCP 47 format
  @objc(getAppLanguage:withRejecter:)
  func getAppLanguage(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    if let appLanguage = UserDefaults.standard.stringArray(forKey: "AppleLanguages")?.first {
      resolve(appLanguage)
    } else {
      reject("E_NO_APP_LANGUAGE", "No app language set", nil)
    }
  }

  // Set the app's language
  @objc(setAppLanguage:withResolver:withRejecter:)
  func setAppLanguage(language: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    UserDefaults.standard.set([language], forKey: "AppleLanguages")
    UserDefaults.standard.synchronize()
    resolve(nil)
  }
}

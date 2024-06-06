package com.nativelanguage

import android.content.Context
import android.content.SharedPreferences
import android.content.res.Configuration
import android.os.Build
import android.os.LocaleList
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.Locale
import androidx.core.os.LocaleListCompat
import androidx.appcompat.app.AppCompatDelegate

class NativeLanguageModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun getAppLanguage(promise: Promise) {
    try {
      var preferences = getPreferences();
      val appLanguage: String? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && !AppCompatDelegate.getApplicationLocales().isEmpty) {
        // get per-app language
        AppCompatDelegate.getApplicationLocales()[0]?.toLanguageTag()
      } else if(preferences.getString("languageFrom", null) == Locale.getDefault().language){
        // if API is < 33, then use SharedPreferences with fallback to default System Locale
        preferences.getString("language", Locale.getDefault().toLanguageTag())
      } else {
        // Fallback to the default System Locale
        Locale.getDefault().toLanguageTag()
      }
      promise.resolve(appLanguage ?: "en")
    } catch (e: Exception) {
      promise.reject("Error", "Failed to get app language", e)
    }
  }

  @ReactMethod
  fun setAppLanguage(language: String, promise: Promise) {
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        val appLocale = LocaleListCompat.forLanguageTags(language)
        AppCompatDelegate.setApplicationLocales(appLocale)
      } else {
        // if API is < 33, then set SharedPreferences language
        getPreferences().edit().apply {
          putString("languageFrom", Locale.getDefault().language)
          putString("language", language)
          apply()
        }
      }
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("Error", "Failed to set app language", e)
    }
  }

  /**
   * SharedPreferences (only used when API version is below 33)
   **/
  private fun getPreferences(): SharedPreferences {
    return reactApplicationContext.getSharedPreferences(
      "LocalizationSettings", Context.MODE_PRIVATE
    )
  }

  companion object {
    const val NAME = "NativeLanguage"
  }
}

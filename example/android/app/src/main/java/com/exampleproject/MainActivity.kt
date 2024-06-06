package com.exampleproject

import android.content.res.Configuration
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import java.util.*

class MainActivity : ReactActivity() {

    companion object {
        @JvmStatic
        var currentLocale: String? = null
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "ExampleProject"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        currentLocale = resources.configuration.locales[0].toLanguageTag()
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)

        val locale = newConfig.locales[0].toLanguageTag()
        if (currentLocale != locale) {
            currentLocale = locale
            val instanceManager = reactInstanceManager
            instanceManager.recreateReactContextInBackground()
        }
    }
}

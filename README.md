# react-native-native-language

React Native module for detecting and setting the app's default language.

## APP (IOS/Android)
<img src="https://github.com/orcunorcun/react-native-native-language/assets/23243922/647f4b21-847f-4cc9-b11a-3d4180dba6d9" width="200" />
<img src="https://github.com/orcunorcun/react-native-native-language/assets/23243922/d25934cf-547e-4472-9a4b-41c1fe5e04aa" width="200" />
<img src="https://github.com/orcunorcun/react-native-native-language/assets/23243922/75ddb683-cbf3-4e0b-a7dd-11967977536a" width="200" />
<img src="https://github.com/orcunorcun/react-native-native-language/assets/23243922/f07ef68d-6c95-4951-a72d-a1f1f2e4ca23" width="200" />

## Installation

```bash
npm install react-native-native-language
# or if you use Yarn
yarn add react-native-native-language
```

After installation, you need to link the library to your project. If you're using React Native 0.60 or higher, autolinking will just do the job. For iOS, make sure you have Cocoapods installed. Then run:

```bash
cd ios && pod install && cd ..
```

### Additionals
If you want your Android App to restart for language updates when you change the app language and return to the application, please add the following:

In `./android/app/src/main/AndroidManifest.xml`

```xml
<!-- Add "layoutDirection" and "locale" -->
android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode|layoutDirection|locale"
```

In `./android/app/src/main/java/com/yourapp/MainActivity.kt`

```kotlin
package com.exampleproject

import android.content.res.Configuration // <- Add this line
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import java.util.*

class MainActivity : ReactActivity() {

    // Add this object
    companion object {
        @JvmStatic
        var currentLocale: String? = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        currentLocale = resources.configuration.locales[0].toLanguageTag() // <- Add this line
    }

    // Add this function
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
```

## Supported platforms

| Platforms |  |
|---|---|
| IOS | ✓ |
| Android* | ✓ |

*On versions older than API level 33 (Android 13), the library uses SharedPreferences to store the language.

## Usage

Here is a simple example of how to use the module:

```jsx
import { getAppLanguage, setAppLanguage } from 'react-native-native-language;

// Get app language
getAppLanguage().then(appLanguage => console.log(appLanguage));

// Set app language
setAppLanguage('tr');
```

For a more detailed example, please refer to the [example directory](/example) in the repository.

## API

### `getAppLanguage()`

Returns a promise that resolves to the app's default language.

### `setAppLanguage(language: string)`

Sets the app's language to the specified language. Returns a promise that resolves when the language has been set.

## License

MIT

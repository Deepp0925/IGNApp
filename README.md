# IGN React Native App

A clone of IGN mobile app with infinite scroll, fetching data from IGN's api and swipeable navigation pages

_Note: This app is only built for ios, it may not function as intended for android_

# Previews
- [Preview Video](https://streamable.com/8weee)
- [Videos Page](/images/Videos.png)
- [Articles Page](/images/Articles.png)

# Running the App

run the following lines of code in root directory

1. `npm install`
2. `cd ios && pod install && cd ../`
3. Open the `xcworkspace` file in ios folder
4. Choose the desired device/ simulator and hit play

## Generate IPA file

1. In Xcode
   `Products`->`Scheme`->`Edit scheme` -> Change build configuration to `RELEASE`
2. `Change device` -> `Generic iOS device`
3. `Product` -> `Clean` and then `Build`
4. `.app` file can be found at
   `~/Library/Developer/Xcode/DerivedData/IGNApp-<some-random-string>/Build/Products/Release-iphoneos/IGNApp`
5. Create folder name `Payload`.
6. Paste `.app` file into `Payload` folder.
7. Compress the `Payload` folder.
8. Change the name you want and put extension as `.ipa`

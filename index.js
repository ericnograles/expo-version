const fs = require('fs');

function synchronizeVersions() {
  try {
    const packageJson = require('./package.json');
    const appJson = require('./app.json');
    if (appJson.expo) {
      appJson.expo.version = packageJson.version;

      if (appJson.expo.ios) {
        appJson.expo.ios.buildNumber = packageJson.version;
      }

      if (appJson.expo.android) {
        appJson.expo.android.versionCode += 1;
      }

      fs.writeFileSync('./app.json', JSON.stringify(appJson, null, 2));
      return;
    }

    console.log(`[expo-version]: No Expo project found`);
  } catch (error) {
    console.error(error);
  }
}

synchronizeVersions();
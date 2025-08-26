const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca app.json atau app.config.js
function getAppConfig() {
  let config;
  if (fs.existsSync('app.json')) {
    config = require('../app.json');
  } else if (fs.existsSync('app.config.js')) {
    config = require('../app.config.js');
  } else {
    throw new Error('No app.json or app.config.js found');
  }
  return config.default || config;
}

// Fungsi utama untuk memperbaiki konfigurasi Android
function fixAndroidConfig() {
  const config = getAppConfig();
  const packageName = config.expo.android.package || 'com.example.app';

  // Pastikan direktori android ada
  if (!fs.existsSync('android')) {
    console.log('Android directory not found, skipping configuration');
    return;
  }

  // Perbaiki settings.gradle
  const settingsGradlePath = path.join('android', 'settings.gradle');
  const settingsContent = `rootProject.name = '${packageName}'
apply from: new File(["node", "--print", "require.resolve('expo/package.json')"].execute(null, rootDir).text.trim(), "../scripts/autolinking.gradle")
useExpoModules()
include ':app'
`;
  fs.writeFileSync(settingsGradlePath, settingsContent);
  console.log('Updated settings.gradle');

  // Perbaiki build.gradle
  const buildGradlePath = path.join('android', 'app', 'build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let buildContent = fs.readFileSync(buildGradlePath, 'utf8');
    
    // Update compileSdkVersion dan targetSdkVersion
    buildContent = buildContent.replace(
      /compileSdkVersion \d+/,
      'compileSdkVersion 35'
    );
    buildContent = buildContent.replace(
      /targetSdkVersion \d+/,
      'targetSdkVersion 35'
    );
    
    // Tambahkan buildTypes jika tidak ada
    if (!buildContent.includes('buildTypes')) {
      buildContent += `

android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        debug {
            minifyEnabled false
        }
    }
}
`;
    }
    
    fs.writeFileSync(buildGradlePath, buildContent);
    console.log('Updated app/build.gradle');
  }

  console.log('Android configuration fixed successfully');
}

// Jalankan script
try {
  fixAndroidConfig();
} catch (error) {
  console.error('Error fixing Android config:', error.message);
  process.exit(1);
}

App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>YOUR DESCRIPTION (PHOTOS PERMISSION) HERE</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>YOUR DESCRIPTION (CAMERA PERMISSION) HERE</string>
    </config-file>
  </platform>`);
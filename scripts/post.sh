#!/bin/bash

# https://github.com/react-native-community/react-native-camera#no-face-detection-steps
echo "Creating project without FaceDetector"

if [ -e node_modules/react-native-camera/ios/FaceDetector ] ; then
  rm -rf node_modules/react-native-camera/ios/FaceDetector
fi

cp node_modules/react-native-camera/postinstall_project/projectWithoutFaceDetection.pbxproj node_modules/react-native-camera/ios/RNCamera.xcodeproj/project.pbxproj

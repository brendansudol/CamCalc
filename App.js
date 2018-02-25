import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'

import { GOOGLE_API_KEY } from './env.config'

const fetchLabels = async base64 => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`
  const data = {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          image: { content: base64 },
          features: [{ type: 'LABEL_DETECTION' }]
        }
      ]
    })
  }

  return await fetch(url, data).then(
    response => response.json(),
    err => console.error(err)
  )
}

class App extends Component {
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      console.warn(data.uri)

      let result = await fetchLabels(data.base64)
      console.log(result)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        <View style={styles.captureHolder}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  captureHolder: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

export default App

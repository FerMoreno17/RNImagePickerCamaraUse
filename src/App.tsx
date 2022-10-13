import React, { useState } from 'react';
import {
  // Alert,
  // PermissionsAndroid,
  // Platform,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const App = () => {
  const uri_init = 'https://i.pinimg.com/originals/4f/5d/23/4f5d23170a65869ff7c210342516ad2c.jpg';
  const [imageSelected, setImageSelected] = useState(uri_init);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    buttonOpen: {
      backgroundColor: '#91D86B',
      padding: 20,
      maxWidth: 320,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 20,
    },
    buttonOpenLabel: {
      fontSize: 18,
      color: 'black',
    },
    image: {
      alignSelf: 'center',
      width: 250,
      height: 250,
      backgroundColor: '#ddd',
      marginBottom: 20,
    },
  });

  // async function requestCameraPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Acceso a cámara',
  //         message: 'Solicitamos permiso para validar identidad',
  //         buttonPositive: 'Aceptar',
  //         buttonNegative: 'Cancelar',
  //       }
  //     );
  //     //if CAMERA Permission is granted
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } catch (error) {
  //     console.log('Error  Camera_permission ==>', error);
  //   }
  //   return false;
  // }

  // async function requestExternalReadPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Acceso a archivo',
  //         message: 'Solicitamos acceso para ver fotografia',
  //         buttonPositive: 'Aceptar',
  //         buttonNegative: 'Cancelar',
  //       }
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } catch (error) {
  //     console.log('Error_external_read_Permission ===>', error);
  //   }
  //   return false;
  // }

  // async function requestExternalWritePermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Acceso a archivo',
  //         message: 'Solicitamos acceso para ver fotografia',
  //         buttonPositive: 'Aceptar',
  //         buttonNegative: 'Cancelar',
  //       }
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } catch (error) {
  //     console.log('Error_external_read_Permission ===>', error);
  //   }
  //   return false;
  // }

  // async function handleOpenCamera() {
  //   if (Platform.OS === 'android') {
  //     if (await requestCameraPermission()) {
  //       if (await requestExternalWritePermission()) {
  //         if (await requestExternalReadPermission()) {
  //           handleLaunchCamera();
  //         } else {
  //           Alert.alert('READ_EXTERNAL_STORAGE permission denied');
  //         }
  //       } else {
  //         Alert.alert('WRITE_EXTERNAL_STORAGE permission denied');
  //       }
  //     } else {
  //       Alert.alert('CAMERA permission denied');
  //     }
  //   }
  //   else {
  //     handleLaunchCamera();
  //   }

  // }

  function handleLaunchLibrary() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log('Error ==>', response.errorMessage);
      } else if (response.didCancel) {
        console.log('Cancelado por usuario');
      } else {
        const path = response!.assets![0].uri;
        setImageSelected(path as string);
      }
    });
  }

  function handleLaunchCamera() {
    const options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 1000,//para que el alto sea el recomendado
      maxHeight: 720,
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: false,
      cameraType: 'front',
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        console.log('Error ==>', response.errorMessage);
      } else if (response.didCancel) {
        console.log('Cancelado por usuario');
      } else {
        const path = response!.assets![0].uri;
        setImageSelected(path as string);
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imageSelected }} />
      <Pressable
        onPress={handleLaunchLibrary}
        style={styles.buttonOpen}>
        <Text style={styles.buttonOpenLabel}>
          OPEN LIBRARY
        </Text>
      </Pressable>
      <Pressable
        onPress={handleLaunchCamera}
        style={styles.buttonOpen}>
        <Text style={styles.buttonOpenLabel}>
          OPEN CAMERA
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;

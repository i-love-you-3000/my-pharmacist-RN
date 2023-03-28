import { StyleSheet } from "react-native";
import { Button, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";

export default function TabOneScreen() {
    let cameraRef = useRef(null);
    const [photo, setPhoto] = useState();
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View><Text>Camera permissions are still loading</Text></View>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        if (cameraRef.current) {
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    };
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>사진 찍기</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});

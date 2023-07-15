import { StyleSheet } from "react-native";
import { Button, TouchableOpacity, ImageBackground, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Camera, CameraType, CameraCapturedPicture } from "expo-camera";
import { useRef, useState } from "react";
import axios from "axios";

export default function TabOneScreen() {
    let cameraRef = useRef<Camera>(null);
    const router = useRouter();
    const [photo, setPhoto] = useState<CameraCapturedPicture>();
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [viewPicture, setViewPicture] = useState(false);

    if (!permission) {
        // Camera permissions are still loading
        return (
            <View>
                <Text>Camera permissions are still loading</Text>
            </View>
        );
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
            console.log(newPhoto);
            
            setPhoto(newPhoto);
            setViewPicture(true);
            // await axios
            //     .get("")
            //     .then((res) => {
            //         //서버로 부터 약이름 받고

            //         //다시 입력창으로 돌아가기
            //         router.back();
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    };
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "촬영으로 약 추가하기",
                }}
            />
            {!viewPicture && permission && (
                <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                            <Text style={styles.text}>사진 찍기</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
            {viewPicture && (
                <View style={styles.imageView}>
                    <ImageBackground source={{ uri: photo && photo.uri }} style={styles.image}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setViewPicture(false);
                                }}
                            >
                                <Text style={styles.text}>다시 찍기</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            )}
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
    flexOne: {
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
    imageView: {
        position: "relative",
        flex: 1,
    },
    image: {
        flex: 1,
    },
    reCaptureBtn: {
        flexDirection: "row",
        flex: 1,
        position: "absolute",
        backgroundColor: "transparent",
        margin: 64,
    },
});

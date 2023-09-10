import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import messaging from '@react-native-firebase/messaging';
// import * as Notifications from 'expo-notifications';


// Notifications.setNotificationHandler({
// 	handleNotification: async () => ({
// 		shouldShowAlert: true,
// 		shouldPlaySound: true,
// 		shouldSetBadge: true,
// 	}),
// });

export default function Login() {
    const router = useRouter();
    const [loginID, setLoginID] = useState("");
    const [loginPW, setLoginPW] = useState("");
    const [loginToken, setLoginToken] = useState("");

    const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled = 
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if(enabled){
            const token = await messaging().getToken();
            setLoginToken(token);
            console.log(token);
			console.log('Authorization status:', authStatus);
		} else {
            console.log('FCM Authorization failed');
        }
    }

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('약 복용 시간입니다', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        messaging().getInitialNotification().then(remoteMessage => {
            if(remoteMessage){
                console.log('Notification caused app to open from quit state: ', remoteMessage.notification);
            }
        });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log('Notification caused app to open from background state: ', remoteMessage.notification);
        });
    
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background', remoteMessage);
        });
    }, []);
    
    const getLogin = async () => {
        router.replace({ pathname: "/home", params: { id: loginID } });
        await axios
            .get("http://localhost:포트번호/app/users/login", { params: { id: loginID, pw: loginPW, tk: loginToken } })
            .then((res) => {
                if (res.data.response) {
                    router.replace({ pathname: "/home", params: { id: loginID } });
                } else {
                    alert("다시 시도해주세요.");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "로그인",
                    }}
                />
                <Text style={styles.title}>나만의 약사</Text>
                <TextInput
                    onChangeText={(e) => setLoginID(e)}
                    returnKeyType="done"
                    value={loginID}
                    placeholder="아이디"
                    style={styles.inputText}
                ></TextInput>
                <TextInput
                    onChangeText={(e) => setLoginPW(e)}
                    returnKeyType="done"
                    value={loginPW}
                    placeholder="비밀번호"
                    style={styles.inputText}
                ></TextInput>
                <TouchableOpacity
                    onPress={() => {
                        getLogin();
                    }}
                    style={styles.loginButton}
                >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/signup");
                    }}
                    style={styles.signupButton}
                >
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const GREEN = "#5CBD57";
const BLUE = "#24B2FF";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        marginBottom: 30,
    },
    inputText: {
        color: "white",
        fontSize: 18,
        borderColor: GREEN,
        borderRadius: 30,
        borderWidth: 1.5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: "55%",
        marginBottom: 10,
    },
    loginButton: {
        marginTop: 10,
        width: "30%",
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: GREEN,
        backgroundColor: GREEN,
    },
    signupButton: {
        marginVertical: 20,
        width: "30%",
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: BLUE,
        backgroundColor: BLUE,
    },
    buttonText: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: "center",
    },
});

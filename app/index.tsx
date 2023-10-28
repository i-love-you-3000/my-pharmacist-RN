import { Link, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const [loginID, setLoginID] = useState("");
    const [loginPW, setLoginPW] = useState("");
    const getLogin = async () => {
        // router.replace({ pathname: "/home", params: { id: loginID } });
        await axios
            .post("http://172.20.10.13:5000/app/users/login", { id: loginID, pw: loginPW })
            .then((res) => {
                if (res.data.response) {
                    router.replace({ pathname: "/home", params: { id: loginID } });
                } else {
                    alert("다시 시도해주세요.");
                }
            })
            .catch((err) => alert("다시 시도해주세요"));
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

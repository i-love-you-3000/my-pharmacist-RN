import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default function SignUp() {
    const [newID, setNewID] = useState("");
    const [newPW, setNewPW] = useState("");

    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "회원가입",
                    }}
                />
                <Text style={styles.title}>나만의 약사</Text>
                <TextInput
                    onChangeText={(e) => setNewID(e)}
                    returnKeyType="done"
                    value={newID}
                    placeholder="아이디"
                    style={styles.inputText}
                ></TextInput>
                <TextInput
                    onChangeText={(e) => setNewPW(e)}
                    returnKeyType="done"
                    value={newPW}
                    placeholder="비밀번호"
                    style={styles.inputText}
                ></TextInput>
                <TouchableOpacity onPress={() => {}} style={styles.loginButton}>
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

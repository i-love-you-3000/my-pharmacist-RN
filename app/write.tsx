import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Write() {
    const router = useRouter();
    const [medicineName, setMedicineName] = useState("");
    return (
        <>
            <View style={styles.container}>
                <TextInput
                    onChangeText={(e) => setMedicineName(e)}
                    returnKeyType="done"
                    value={medicineName}
                    placeholder="약 이름"
                    style={styles.inputText}
                ></TextInput>
                <TouchableOpacity
                    onPress={() => {
                        router.replace("/home");
                    }}
                    style={styles.loginButton}
                >
                    <Text style={styles.buttonText}>추가</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const GREEN = "#5CBD57";
const BLUE = "#24B2FF";
const GREY = "#A2AF9F";
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
        borderColor: GREY,
        borderRadius: 30,
        borderWidth: 1.5,
        paddingVertical: 9,
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

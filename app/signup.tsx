import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUp() {
    const router = useRouter();
    const [newID, setNewID] = useState("");
    const [newPW, setNewPW] = useState("");
    const [breakfastTime, setBreakfastTime] = useState(new Date(Date.now()));
    const [lunchTime, setLunchTime] = useState(new Date(Date.now()));
    const [dinnerTime, setDinnerTime] = useState(new Date(Date.now()));
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "회원가입",
                    }}
                />
                <Text style={styles.title}>반갑습니다! 😁</Text>
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
                <View style={styles.time}>
                    <Text style={styles.timeText}>아침 식사 시간</Text>
                    <DateTimePicker value={breakfastTime} mode="time" />
                </View>
                <View style={styles.time}>
                    <Text style={styles.timeText}>저심 식사 시간</Text>
                    <DateTimePicker value={lunchTime} mode="time" />
                </View>
                <View style={styles.time}>
                    <Text style={styles.timeText}>저녁 식사 시간</Text>
                    <DateTimePicker value={dinnerTime} mode="time" />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        router.push("/login");
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
        borderColor: BLUE,
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
    time: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    timeText: {
        color: "white",
        fontSize: 16,
    },
});

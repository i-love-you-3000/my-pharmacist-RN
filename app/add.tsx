import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Button } from "react-native";
import { Link, Stack, useRouter, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Checkbox from "expo-checkbox";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useMedicineNameContext } from "../components/context";
import axios from "axios";
const GREEN = "#5CBD57";
const BLUE = "#24B2FF";
const GREY = "#A2AF9F";
export default function Add() {
    const router = useRouter();
    let item = useGlobalSearchParams();
    const [medicineName, setMedicineName] = useState("");
    const [beforeMeal, setBeforeMeal] = useState(false);
    const [afterMeal, setAfterMeal] = useState(true);
    const [breakfast, setBreakfast] = useState(true);
    const [lunch, setLunch] = useState(true);
    const [dinner, setDinner] = useState(true);
    const [manufactureTime, setManufactureTime] = useState(new Date(Date.now()));
    const [manufactureTimePicker, setManufactureTimePicker] = useState(false);
    const { medicineNameFromCamera, setMedicineNameFromCamera } = useMedicineNameContext();
    const [intakePeriod, setIntakePeriod] = useState("");
    const params = useLocalSearchParams();
    useEffect(() => {
        setMedicineName("");
        console.log(params.id);
    }, []);
    useEffect(() => {
        console.log(medicineNameFromCamera);
        if (medicineNameFromCamera) setMedicineName(medicineNameFromCamera);
    }, [medicineNameFromCamera]);
    const addMedicine = async () => {
        await axios
            .post("http://172.20.10.13:5000/app/prescription/register", {
                id: params.id,
                itemName: medicineName,
                registerDate: Date.now(),
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner,
                baw: beforeMeal ? "B" : "A",
                intakePeriod: intakePeriod,
                expPeriod: manufactureTime,
            })
            .then((res) => {
                if (res.data.response) router.replace({ pathname: "/home", params: { id: params.id } });
            });
    };
    return (
        <>
            <Stack.Screen
                options={{
                    title: "약 추가하기",
                }}
            />
            <View style={styles.container}>
                <View style={styles.row}>
                    <TextInput
                        onChangeText={(e) => setMedicineName(e)}
                        returnKeyType="done"
                        value={medicineName}
                        placeholder="약 이름"
                        placeholderTextColor="gray"
                        style={styles.inputText}
                    ></TextInput>
                    <Link href="/camera" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="camera"
                                    size={20}
                                    color={"white"}
                                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1, marginBottom: 8 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                </View>

                <Text style={styles.title}>복용해야 하는 시간을 선택해주세요.</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.checkSection}
                        onPress={() => {
                            setBreakfast(!breakfast);
                        }}
                    >
                        <Checkbox
                            style={styles.checkbox}
                            value={breakfast}
                            onValueChange={() => {
                                setBreakfast(!breakfast);
                            }}
                            color={breakfast ? GREEN : undefined}
                        />
                        <Text style={styles.title}>아침</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checkSection}
                        onPress={() => {
                            setLunch(!lunch);
                        }}
                    >
                        <Checkbox
                            style={styles.checkbox}
                            value={lunch}
                            onValueChange={() => {
                                setLunch(!lunch);
                            }}
                            color={lunch ? GREEN : undefined}
                        />
                        <Text style={styles.title}>점심</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checkSection}
                        onPress={() => {
                            setDinner(!dinner);
                        }}
                    >
                        <Checkbox
                            style={styles.checkbox}
                            value={dinner}
                            onValueChange={() => {
                                setDinner(!dinner);
                            }}
                            color={dinner ? GREEN : undefined}
                        />
                        <Text style={styles.title}>저녁</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.checkSection}
                        onPress={() => {
                            setBeforeMeal(!beforeMeal);
                            setAfterMeal(false);
                        }}
                    >
                        <Checkbox
                            style={styles.checkbox}
                            value={beforeMeal}
                            onValueChange={() => {
                                setBeforeMeal(!beforeMeal);
                                setAfterMeal(false);
                            }}
                            color={beforeMeal ? GREEN : undefined}
                        />
                        <Text style={styles.title}>식전</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.checkSection}
                        onPress={() => {
                            setAfterMeal(!afterMeal);
                            setBeforeMeal(false);
                        }}
                    >
                        <Checkbox
                            style={styles.checkbox}
                            value={afterMeal}
                            onValueChange={() => {
                                setAfterMeal(!afterMeal);
                                setBeforeMeal(false);
                            }}
                            color={afterMeal ? GREEN : undefined}
                        />
                        <Text style={styles.title}>식후</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>약 유통기한</Text>

                    {Platform.OS === "ios" && (
                        <DateTimePicker
                            value={manufactureTime}
                            mode="date"
                            onChange={(e, date) => {
                                date && setManufactureTime(date);
                            }}
                        />
                    )}
                    {Platform.OS === "android" && (
                        <>
                            <Button onPress={() => setManufactureTimePicker(true)} title="시간 설정" />
                            {manufactureTimePicker && (
                                <DateTimePicker
                                    value={manufactureTime}
                                    mode="date"
                                    onChange={(e, date) => {
                                        setManufactureTimePicker(false);
                                        date && setManufactureTime(date);
                                    }}
                                />
                            )}
                        </>
                    )}
                </View>
                <View style={styles.row}>
                    <TextInput
                        onChangeText={(e) => setIntakePeriod(e)}
                        returnKeyType="done"
                        value={intakePeriod}
                        placeholder="복용 기한 ex) 6"
                        placeholderTextColor="gray"
                        style={styles.inputText}
                    ></TextInput>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        addMedicine();
                    }}
                    style={styles.Button}
                >
                    <Text style={styles.buttonText}>추가</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: "white",
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
    Button: {
        marginTop: 10,
        width: "30%",
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: GREEN,
        backgroundColor: GREEN,
    },
    checkSection: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    buttonText: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: "center",
    },
    checkbox: {
        margin: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

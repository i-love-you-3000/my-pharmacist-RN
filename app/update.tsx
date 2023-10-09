import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Button, Platform } from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { useMedicineNameContext } from "../components/context";

const GREEN = "#5CBD57";
const BLUE = "#24B2FF";
const GREY = "#A2AF9F";
type MedicineEatData = {
    itemSeq: string; // "202002585",
    registerDate: string; // "등록날짜",
    itemName: string;
    breakfast: true | false;
    lunch: true | false;
    dinner: true | false;
    baw: "B" | "A" | "W"; //"B 식전" | "A 식후" | "W 식중"
    intakePeriod: number; // 8,
    expPeriod: string; // "2023/07/05"
};
export default function AddMedicine() {
    const router = useRouter();
    const [medicineName, setMedicineName] = useState("");
    const [beforeMeal, setBeforeMeal] = useState(false);
    const [afterMeal, setAfterMeal] = useState(true);
    const [breakfast, setBreakfast] = useState(true);
    const [lunch, setLunch] = useState(true);
    const [dinner, setDinner] = useState(true);
    const [manufactureTime, setManufactureTime] = useState(new Date(Date.now()));
    const params = useLocalSearchParams();
    const [manufactureTimePicker, setManufactureTimePicker] = useState(false);
    const { medicineNameFromCamera, setMedicineNameFromCamera } = useMedicineNameContext();
    const getMedicineInfo = async () => {
        // await axios
        //     .get("http://localhost:포트번호/app/prescription/", { params: { id: params.id, itemSeq:params.itemSeq, registerDate:params.registerDate } })
        //     .then((res) => {})
        //     .catch((err) => console.log(err));
        const testEatData: MedicineEatData = {
            itemSeq: "202002585",
            registerDate: "2023/07/05",
            itemName: "약이름",
            breakfast: true,
            lunch: true,
            dinner: true,
            baw: "B",
            intakePeriod: 8,
            expPeriod: "2023-07-05",
        };
        setMedicineName(testEatData.itemName);
        setBreakfast(testEatData.breakfast);
        setLunch(testEatData.lunch);
        setDinner(testEatData.dinner);
        testEatData.baw === "A" ? setBeforeMeal(true) : setAfterMeal(true);
        setManufactureTime(new Date(testEatData.expPeriod));
    };

    useEffect(() => {
        console.log(medicineNameFromCamera);
        if (medicineNameFromCamera) setMedicineName(medicineNameFromCamera);
    }, [medicineNameFromCamera]);
    useEffect(() => {
        setMedicineName("");
        getMedicineInfo();
        console.log("useEffect");
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "수정하기",
                }}
            />
            <View style={styles.container}>
                <View style={styles.row}>
                    <TextInput
                        onChangeText={(e) => setMedicineName(e)}
                        returnKeyType="done"
                        value={medicineName}
                        placeholder="약 이름"
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
                                        date && setManufactureTime(date);
                                    }}
                                />
                            )}
                        </>
                    )}
                </View>

                <TouchableOpacity
                    onPress={() => {
                        router.replace("/home");
                    }}
                    style={styles.Button}
                >
                    <Text style={styles.buttonText}>수정</Text>
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

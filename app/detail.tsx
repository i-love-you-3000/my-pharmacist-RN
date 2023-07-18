import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, useRouter, useLocalSearchParams } from "expo-router";
// import { Image } from "expo-image";
import axios from "axios";
import medicineNameContext from "../components/context";

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

type MedicineInfo = {
    item_seq: string;
    item_name: string;
    effect: string;
    image: string;
};
const testInfo: MedicineInfo = {
    item_seq: "itemSeq",
    item_name: "itemName",
    effect: "effect",
    image: "https://picsum.photos/600/400",
};
const testEatData: MedicineEatData = {
    itemSeq: "202002585",
    registerDate: "2023/07/05",
    itemName: "약이름",
    breakfast: true,
    lunch: true,
    dinner: true,
    baw: "B",
    intakePeriod: 8,
    expPeriod: "2023/07/05",
};
const GREEN = "#5CBD57";
const BLUE = "#24B2FF";
const GREY = "#A2AF9F";
export default function AddMedicine() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [medicineEatData, setMedicineEatData] = useState<MedicineEatData>();
    const [medicineInfo, setMedicineInfo] = useState<MedicineInfo>();
    const { medicineNameFromCamera, setMedicineNameFromCamera } = useContext(medicineNameContext);
    
    const getMedicineInfo = async () => {
        await axios
            .get("http://localhost:포트번호/app/medicine", {
                params: {
                    itemSeq: params.itemSeq,
                },
            })
            .then((res) => {
                setMedicineInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getMedicineEatData = async () => {
        await axios
            .get("http://localhost:포트번호/app/prescription/detail", {
                params: {
                    id: params.id,
                    itemSeq: params.itemSeq,
                    registerDate: params.registerData,
                },
            })
            .then((res) => {
                setMedicineEatData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        console.log(params);
        // getMedicineInfo();
        // getMedicineEatData();
        setMedicineEatData(testEatData);
        setMedicineInfo(testInfo);
        setMedicineNameFromCamera("");
    }, []);
    return (
        <>
            <Stack.Screen
                options={{
                    title: "약 상세정보",
                    headerRight: () => (
                        <Link
                            href={{
                                pathname: "/update",
                                params: { id: params.id, itemSeq: params.itemSeq, registerDate: params.registerDate },
                            }}
                            asChild
                        >
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="edit"
                                        size={20}
                                        color={"white"}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <ScrollView style={styles.container}>
                <Text style={styles.medicineName}>{medicineEatData?.itemName}</Text>

                <View style={styles.flexRow}>
                    <Text style={styles.title}>복용 시간 : </Text>
                    {medicineEatData?.breakfast ? <Text style={styles.eatTime}>아침</Text> : null}
                    {medicineEatData?.lunch ? <Text style={styles.eatTime}>점심</Text> : null}
                    {medicineEatData?.dinner ? <Text style={styles.eatTime}>저녁</Text> : null}
                    {medicineEatData?.baw === "B" ? (
                        <Text style={styles.eatTimeBAW}>식전</Text>
                    ) : medicineEatData?.baw === "A" ? (
                        <Text style={styles.eatTimeBAW}>식전</Text>
                    ) : (
                        <Text style={styles.eatTimeBAW}>식중</Text>
                    )}
                </View>
                <Text style={styles.text}>복용 시작일 : {medicineEatData?.registerDate}</Text>
                <Text style={styles.expiratioDate}>유통기한 : {medicineEatData?.expPeriod}</Text>
                <Image style={styles.image} source={{ uri: medicineInfo?.image }} resizeMode="contain"></Image>
                <Text style={styles.text}>약 상세정보 : {medicineInfo?.effect}</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    medicineName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        color: "white",
    },
    eatTime: {
        color: "#5CBD57",
        marginRight: 5,
        fontWeight: "bold",
        fontSize: 16,
    },
    eatTimeBAW: {
        color: "white",
        fontSize: 16,
    },
    flexRow: {
        flexDirection: "row",
        marginBottom: 5,
    },
    expiratioDate: {
        color: "red",
        fontSize: 16,
        marginBottom: 5,
    },
    text: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: "center",
        marginBottom: 5,
    },
});

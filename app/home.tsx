import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Pressable, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import axios from "axios";
import messaging from '@react-native-firebase/messaging';

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

const testData: MedicineEatData[] = [
    {
        itemSeq: "202002585",
        registerDate: "2023/07/05",
        itemName: "약이름",
        breakfast: true,
        lunch: true,
        dinner: true,
        baw: "B",
        intakePeriod: 8,
        expPeriod: "2023/07/05",
    },
    {
        itemSeq: "202002585",
        registerDate: "2023/07/05",
        itemName: "약이름",
        breakfast: true,
        lunch: true,
        dinner: true,
        baw: "B",
        intakePeriod: 8,
        expPeriod: "2023/07/05",
    },
];

export default function Home() {
    const router = useRouter();
    const [list, setList] = useState<MedicineEatData[]>();
    const params = useLocalSearchParams();
    const getMedList = async () => {
        await axios
            .get("http://localhost:포트번호/app/prescription/", { params: params.id })
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('약 복용 시간입니다', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(params); // login ID
        // getMedList();
        setList(testData);
    }, []);
    
    const goDetail = (itemSeq: string, registerData: string) => {
        // router.push("detail");
        router.push({
            pathname: "detail",
            params: { id: params.id, itemSeq, registerData },
        });
    };
    
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "복용중인 약",
                        headerRight: () => (
                            <Link href="/add" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <FontAwesome
                                            name="plus"
                                            size={20}
                                            color={"white"}
                                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                        ),
                        headerLeft: () => (
                            <Pressable
                                onPress={() => {
                                    router.push("/user");
                                }}
                            >
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="user-circle-o"
                                        size={20}
                                        color={"white"}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        ),
                    }}
                />
                <ScrollView style={styles.list}>
                    {list?.map((med, index) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            key={index}
                            onPress={() => goDetail(med.itemSeq, med.registerDate)}
                        >
                            <View style={styles.listItemLeft}>
                                <Text style={styles.medicineName}>{med.itemName}</Text>
                            </View>
                            <View style={styles.listItemRight}>
                                <View style={styles.eatTimeContainer}>
                                    {med.breakfast ? <Text style={styles.eatTime}>아침</Text> : null}
                                    {med.lunch ? <Text style={styles.eatTime}>점심</Text> : null}
                                    {med.dinner ? <Text style={styles.eatTime}>저녁</Text> : null}
                                    {med.baw === "B" ? (
                                        <Text style={styles.eatTimeBAW}>식전</Text>
                                    ) : med.baw === "A" ? (
                                        <Text style={styles.eatTimeBAW}>식전</Text>
                                    ) : (
                                        <Text style={styles.eatTimeBAW}>식중</Text>
                                    )}
                                </View>
                                <Text style={styles.registerDate}>복용 시작일 : {med.registerDate}</Text>
                                <Text style={styles.expiratioDate}>유통기한 : {med.expPeriod}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        flex: 1,
        width: "100%",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
    listItem: {
        borderBottomWidth: 0.2,
        borderBottomColor: "#C6C6C6",
        paddingVertical: 18,
        paddingHorizontal: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listItemLeft: {
        flex: 1,
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    listItemRight: {
        alignItems: "flex-end",
    },
    medicineName: {
        color: "white",
        fontSize: 24,
    },
    eatTime: {
        color: "#5CBD57",
        marginRight: 5,
        fontWeight: "bold",
        fontSize: 16,
    },
    eatTimeBAW: {
        color: "white",
        marginBottom: 5,
        fontSize: 16,
    },
    expiratioDate: {
        color: "red",
        fontSize: 14,
    },
    eatTimeContainer: {
        flexDirection: "row",
        marginBottom: 1,
    },
    registerDate: {
        color: "white",
        fontSize: 14,
        marginBottom: 3,
    },
});

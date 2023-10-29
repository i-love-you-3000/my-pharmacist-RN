import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Pressable, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import axios from "axios";

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
    const [list, setList] = useState<MedicineEatData[]>();
    const params = useLocalSearchParams();
    const router = useRouter();
    const truncateString = (str: string, maxLength: number) => {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.slice(0, maxLength) + "...";
        }
    };
    const getMedList = async () => {
        await axios
            .post("http://172.20.10.13:5000/app/prescription/", { id: params.id })
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        console.log(params); // login ID
        getMedList();
        // setList(testData);
    }, []);
    const goDetail = (itemSeq: string, registerDate: string) => {
        router.setParams({});
        router.push({
            pathname: "/detail",
            params: { id: params.id, itemSeq, registerDate },
        });
    };
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "복용중인 약",
                        headerRight: () => (
                            <>
                                <Pressable
                                    onPress={() => {
                                        router.push({
                                            pathname: "/add",
                                            params: { id: params.id },
                                        });
                                    }}
                                >
                                    {({ pressed }) => (
                                        <FontAwesome
                                            name="plus"
                                            size={20}
                                            color={"white"}
                                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        getMedList();
                                    }}
                                >
                                    {({ pressed }) => (
                                        <FontAwesome
                                            name="refresh"
                                            size={20}
                                            color={"white"}
                                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </>
                        ),
                        headerLeft: () => (
                            <Pressable
                                onPress={() => {
                                    router.replace({
                                        pathname: "/",
                                    });
                                }}
                            >
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="sign-out"
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
                            <View style={styles.columnList}>
                                <View style={styles.listItemLeft}>
                                    <Text style={styles.medicineName}>{truncateString(med.itemName, 12)}</Text>
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
    columnList: {
        flexDirection: "column",
        flex: 1,
    },
});

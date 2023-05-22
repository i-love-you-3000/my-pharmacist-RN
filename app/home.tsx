import { Link, Stack } from "expo-router";
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [list, setList] = useState();
    // useEffect(()=>{
    //     axios.get()
    // },[])
    const medicineList = [
        {
            medicineName: "어어어어어엄청긴약이름입니다",
            expiratioDate: "2023.05.12",
            eatTime: "식후 30분",
        },
        {
            medicineName: "타이레놀",
            expiratioDate: "2023.05.12",
            eatTime: "식후 30분",
        },
        {
            medicineName: "타이레놀",
            expiratioDate: "2023.05.12",
            eatTime: "식후 30분",
        },
    ];
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "복용중인 약",
                        headerRight: () => (
                            <>
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
                            </>
                        ),
                    }}
                />
                <ScrollView style={styles.list}>
                    {medicineList.map((med) => (
                        <View style={styles.listItem}>
                            <View style={styles.listItemLeft}>
                                <Text style={styles.medicineName}>{med.medicineName}</Text>
                            </View>
                            <View style={styles.listItemRight}>
                                <Text style={styles.eatTime}>{med.eatTime}</Text>
                                <Text style={styles.expiratioDate}>~ {med.expiratioDate}</Text>
                            </View>
                        </View>
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
        flex:1,
        justifyContent: "center",
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    listItemRight: {
        alignItems:'flex-end',
    },
    medicineName: {
        color: "white",
        fontSize: 24,
        
    },
    eatTime: {
        color: "#C6C6C6",
        marginBottom:5,
        fontSize: 16
    },
    expiratioDate:{
        color: 'red',
        fontSize: 16,
    }

});

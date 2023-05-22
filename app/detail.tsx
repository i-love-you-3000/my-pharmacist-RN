import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { Link, Stack, useRouter } from "expo-router";

const GREEN = "#5CBD57";
const BLUE = "#24B2FF";
const GREY = "#A2AF9F";
export default function AddMedicine() {
    const router = useRouter();
    useEffect(() => {
    }, []);
    return (
        <>
            <Stack.Screen
                options={{
                    title: "약 상세정보",
                }}
            />
            <View style={styles.container}>
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
    
});

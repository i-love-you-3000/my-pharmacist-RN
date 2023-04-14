import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Home() {
    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "Overview",
                        headerRight: () => (
                            <Link href="/modal" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <FontAwesome
                                            name="plus"
                                            size={25}
                                            color={"white"}
                                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                        ),
                    }}
                />
                <Text style={styles.title}>Home</Text>
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
});

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme, Text } from "react-native";
import messaging from '@react-native-firebase/messaging';
import medicineNameContext from "../components/context";


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
};
SplashScreen.preventAutoHideAsync();

//Forground Message Handler
useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        alert('약 복용 시간입니다' + JSON.stringify(remoteMessage));
    });
    return unsubscribe;
}, []);

export default function RootLayout() {
    const [medicineNameFromCamera, setMedicineNameFromCamera] = useState<string>();
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return (
        <>
            {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}

            {loaded && (
                <medicineNameContext.Provider value={{ medicineNameFromCamera, setMedicineNameFromCamera }}>
                    <RootLayoutNav />
                </medicineNameContext.Provider>
            )}
        </>
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={DarkTheme}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: true }} />
                <Stack.Screen name="signup" options={{ presentation: "card" }} />
            </Stack>
        </ThemeProvider>
    );
}

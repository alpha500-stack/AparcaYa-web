import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Iniciar sesión' }} />
            <Stack.Screen name="register" options={{ title: 'Registro' }} />

            <Stack.Screen name="home" options={{ title: 'Inicio' }} />
        </Stack>
    );
}

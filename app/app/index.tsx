import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { loginUser } from '@/lib/api';

export default function LoginScreen() {
    const router = useRouter();
    const [userOrEmail, setUserOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!userOrEmail || !password) {
            return Alert.alert('Error', 'Completa todos los campos');
        }

        try {
            const res = await loginUser(userOrEmail, password);
            if (res.code === 0) {
                router.replace('/home');
            } else {
                Alert.alert('Error', res.message);
            }
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Usuario o Email</Text>
            <TextInput
                style={styles.input}
                value={userOrEmail}
                onChangeText={setUserOrEmail}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Iniciar sesión" onPress={handleLogin} />

            <Text style={styles.link} onPress={() => router.push('/register')}>
                ¿No tienes cuenta? Regístrate
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, padding: 10 },
    label: { marginBottom: 4 },
    link: { marginTop: 15, color: '#007bff', textAlign: 'center' },
});

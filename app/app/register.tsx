import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { registerUser } from '@/lib/api';

export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!username || !email || !password) {
            return Alert.alert('Error', 'Completa todos los campos');
        }

        try {
            const res = await registerUser(username, email, password);
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
            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Registrarse" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, padding: 10 },
    label: { marginBottom: 4 },
});

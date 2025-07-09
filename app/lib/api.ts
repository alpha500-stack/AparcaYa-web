const BASE_URL = 'http://192.168.1.129:8082/auth';

export async function loginUser(identifier: string, password: string) {
    console.log("Llego !");
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Login failed: ${error}`);
    }

    return res.json();
}

export async function registerUser(username: string, email: string, password: string) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Register failed: ${error}`);
    }

    return res.json();
}

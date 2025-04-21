'use server'

export default async function registerUser(prevState: unknown, formData: FormData) {
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const res = await fetch('http://localhost:3000/auth/regist', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const json = await res.json()

    if (res.ok) {
        console.log('Register successfully', json)
        return {
            error: '',
            message: 'Register successfully',
            data,
        }
    } else {
        console.error('Error Register:', json)
        return {
            error: 'Error Register',
            message: '',
            data,
        }
    }
}
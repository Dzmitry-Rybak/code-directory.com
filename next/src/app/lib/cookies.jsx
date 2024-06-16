'use server'
import { cookies } from 'next/headers'

export async function setCookies(name, token, ...cookiesName) {
    const maxAge = 30 * 24 * 60 * 60; // 30 дней в секундах

    cookies().set({
        name: cookiesName[0],
        value: name,
        sameSite: 'None',
        secure: true,
        path: '/',
        maxAge: maxAge
    });

    cookies().set({
        name: cookiesName[1],
        value: token,
        sameSite: 'None',
        secure: true,
        path: '/',
        maxAge: maxAge
    });
}

'use server'
import { cookies } from 'next/headers'

export async function setCookies (name, token, ...cookiesName) {
        cookies().set({
            name: cookiesName[0],
            value: name,
            sameSite: 'strict',
            path: '/',
            
        })
        cookies().set({
            name: cookiesName[1],
            value: token,
            sameSite: 'strict',
            path: '/',
        });
}
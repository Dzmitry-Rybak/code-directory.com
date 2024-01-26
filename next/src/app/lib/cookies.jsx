'use server'
import { cookies } from 'next/headers'

export async function setCookies (name, token, ...cookiesName) {
        cookies().set({
            name: cookiesName[0],
            value: name,
            sameSite: 'None',
            secure: true,
            path: '/',
            
        })
        cookies().set({
            name: cookiesName[1],
            value: token,
            sameSite: 'None',
            secure: true,
            path: '/',
        });
}
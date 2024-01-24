"use server";
import {cookies} from 'next/headers';
import config from "@/config/config";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const createHeadersWithToken = () => {
    const token = cookies().get('token');
    
    const headers = token ? {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
    } : {'Content-Type': 'application/json'}

    return { headers };
}

export const postQuestion = async (formData) => {
    const {headers} = createHeadersWithToken();
    const _APIURL = config.apiUrl;

    const rawFormData = {
            question: formData.get('question'),
            answer: formData.get('answer'),
            stack: formData.get('stack'),
            language: formData.get('language'),
        };
    
    try {
        await fetch(`${_APIURL}/postnewquestion`, {
            method: "POST",
            body: JSON.stringify(rawFormData),
            headers: headers,
        })
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Failer to post a new question');
    }

    revalidatePath('/');
    redirect(`/?stack=${rawFormData.stack}&language=${rawFormData.language}`); // Redirect to the main page with this languages.
    
}
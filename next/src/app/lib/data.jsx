"use server"
import { unstable_noStore as noStore } from 'next/cache';
import {cookies} from 'next/headers';
import config from '@/config/config';

const _APIURL = config.apiUrl;

const createHeadersWithToken = () => {
    const token = cookies().get('token');
    
    const headers = token ? {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
    } : {'Content-Type': 'application/json'}

    return { headers };
}


// export async function fetchAnswer (questionId, stack, language) {
//     const stackRequest = stack.toLowerCase()
//     const languageRequest = language.toLowerCase()
//     try{
//         const response = await fetch(`${_APIURL}/getanswer?stack=${stackRequest}&language=${languageRequest}&id=${questionId}`);

//         if (!response.ok) {
//             const status = response.status;
//             const errorData = await response.json();
//             throw { status, message: errorData.message };
//         }
        
//         const data = await response.json();
//         return data;
//     } catch (error){
//         console.error('Database Error', error);
//         throw new Error('Failer to fetch answer from data.');
//     }
// }


export async function fetchQuestionsData (stack, language) {
    noStore(); // Reject static caching (create a dynamic route).
    const stackRequest = stack.toLowerCase();
    const languageRequest = language.toLowerCase();
    const {headers} = createHeadersWithToken();

    try{
        const response = await fetch(`${_APIURL}/getquestions?stack=${stackRequest}&language=${languageRequest}`, {
            method: 'GET',
            body: null,
            headers: headers
        });
        if (!response.ok) {
            const status = response.status;
            const errorData = await response.json();
            if(errorData.message === 'The specified table does not exist') {
                return  errorData
            }
            throw { status, message: errorData.message };
        }

        const data = await response.json();
        return data;
    } catch (error){
        if(error.message === 'The specified table does not exist' ) {
            return  error
        } else {
            console.error('Database Error', error);
            throw new Error('Failed to fetch questions data.');
        }
    }
}


export async function fetchUser (url, values) {
    noStore();
    const response = await fetch(`${_APIURL}/${url}`, {
        method: "POST", 
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }})
        const data = await response.json();

    return data;
}

export async function getFilteredQuestions(stack, language) {
    const {headers} = createHeadersWithToken();

    const request = await fetch(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, {
        method: "GET",
        body: null,
        headers: headers
    })

    const data = await request.json();
    return data;
}

export async function postFilteredQuestons(stack, language, filter, data) {
    const {headers} = createHeadersWithToken();
    
    const request = await fetch(`${_APIURL}/updateFilter?stack=${stack}&language=${language}`, {
        method: "POST",
        body: JSON.stringify({filter: filter, array: data}),
        headers: headers
    })

    const response = await request.json();
    return response;
}


export const signout = async () => {
    try {
        await fetch(`${_APIURL}/logout`, {
            method: "POST",
            body: null,
            headers: { "Content-Type": "application/json" }
        })

        cookies().delete('login');
        cookies().delete('token');

    } catch(error) {
        console.error('Server Error ', error)
        throw new Error('Failed to log out.')
    }
}


export const deleteAccount = async () => {
    const {headers} = createHeadersWithToken();

    try {
        await fetch(`${_APIURL}/delete`, {
            method: "DELETE",
            body: null,
            headers: headers
        })
        cookies().delete('login');
        cookies().delete('token');
    } catch (error) {
        console.error('Server Error ', error);
        throw new Error("Couldn't delete account")
    }
}

export const handleVerifyCode = async (code) => {
    const {headers} = createHeadersWithToken();
    try {
        const response = await fetch(`${_APIURL}/verify-code`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ code }),
        })

        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
};

export const getCodeForPickerStack = async () => {
    
    const {headers} = createHeadersWithToken();

    try {
        const response = await fetch(`${_APIURL}/getcodestacks`, {
            method: 'GET',
            headers: headers
        });

        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
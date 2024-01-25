"use client";
import { useEffect } from "react";

import buttonsStyles from '@/app/styles/buttons.module.scss';

export default function Error ({error, reset}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="center-container">
            <div className="error-container">
                <h1>Something went wrong!</h1>
                <button className={buttonsStyles.submit__button} onClick={() => reset()}>Try again</button>
            </div>
        </div>
    )
}

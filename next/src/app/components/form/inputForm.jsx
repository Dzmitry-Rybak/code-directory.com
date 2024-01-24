import Image from 'next/image';
import {useField} from 'formik';
import clsx from 'clsx';

import styles from '@/app/styles/form.module.scss';

export const TextInput = ({placeholder, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const handleFocus = () => {
        helpers.setTouched(false);
    }

    return (
        <div className={styles.input}>
            <input 
                placeholder={placeholder} {...props} {...field}
                onFocus={handleFocus}
                style={meta.touched && meta.error ? {'border': 'solid 1.5px #c63f3f'} : null} />
            {meta.touched && meta.error ? (
                <div className={styles.error__style}>{meta.error}</div>
            ) : null}
            <Image 
                src='/icons/validation.png'
                alt='required field'
                // meta.touched && meta.error ? 'error__img error-active' : 'error__img'
                className={clsx(
                    [styles.error__img],
                    {
                        [styles.error__active]: meta.touched && meta.error,
                    }
                )}
                width='25'
                height='25'/>
        </div>
    )
}

export const Checkbox = ({children, ...props}) => {

    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <div>
            <label>
                <input type="checkbox" className={styles.checkbox} {...props} {...field}/>
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className={styles.error__style}>{meta.error}</div>
            ) : null}
        </div>
    )
};
'use client'
 
import { useFormStatus } from 'react-dom';

import buttonsStyles from '@/app/styles/buttons.module.scss';
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button 
        type="submit" 
        aria-disabled={pending} 
        className={buttonsStyles.submit__button}
    >{pending ? 'Adding...' : 'ADD'}</button>
  )
}
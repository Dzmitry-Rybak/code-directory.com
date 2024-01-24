import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const validSchemaSignIn = Yup.object({
    email: Yup.string()
              .email('Please, write correct email form')
              .required('Please field'),
    password: Yup.string()
                 .required('Required field'),
})

export const validSchemaSignUp = Yup.object({
    login: Yup.string()
             .min(3, 'At least 3 letters')
             .required('Required field'),
    email: Yup.string()
              .email('Please, write correct email form')
              .required('Please field'),
    emailConfirm: Yup.string()
                     .oneOf([Yup.ref('email'), null], "Emails don't confirm")
                     .required('Please confirm email'),
    password: Yup.string()
                 .min(8, 'Min 8 characters')
                 .matches(passwordRegex, 'The password must contain letters, numbers and special characters')
                 .required('Required field'),
    passwordConfirm: Yup.string()
                        .oneOf([Yup.ref('password'), null], "Passwords don't confirm")
                        .required('Please confirm password'),
    terms: Yup.boolean()
              .required('Required field')
              .oneOf([true], 'Consent is required')
})
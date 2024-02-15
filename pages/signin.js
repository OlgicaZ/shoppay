import styles from './../styles/signin.module.scss';
import { BiLeftArrowAlt } from "react-icons/bi";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from 'next/link';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import LoginInput from '@/components/inputs/logininput';
import { useState } from 'react';
import CircledIconButton from '@/components/inputs/buttons/circledIconBtn';
import { getProviders, signIn } from "next-auth/react";
import axios from 'axios';

const initialValues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: ""
}

export default function signin({ providers }) {

    const [user, setUser] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const { login_email, login_password, name, email, password, conf_password, success, error } = user;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginValidation = Yup.object({
        login_email: Yup.string()
            .required('Email address is required')
            .email('Please enter a valid email address'),

        login_password: Yup.string()
            .required('Please enter a password')
    });

    const registerValidation = Yup.object({
        name: Yup.string()
            .required('What is your name')
            .min(2, 'First name must be between 2 and 16 characters')
            .max(16, 'First name must be between 2 and 16 characters')
            .matches(/^[aA-zZ]/, 'Numbers and special chharacters are not allowed'),
        email: Yup.string()
            .required('You will need this when you log in and if you ever need to reset your password')
            .email('Enter a valid email address'),
        password: Yup.string()
            .required('Enter a combination of at least 6 numbers, letters, and punctuation marks (such as ! and &)')
            .min(6, 'Password must be at least 6 characters')
            .max(36, 'Password cannot be more than 36 characters'),
        conf_password: Yup.string()
            .required('Confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    })

    const signUpHandler = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });

            setUser({ ...user, success: data.message, error: '' });
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setUser({ ...user, success: '', error: error.response.data.message });
        }
    }

    return (
        <>
            <Header country={{}} />
            <div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.login__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>We'd be happy to join us! <Link href='/'>Go Store</Link></span>
                    </div>
                    <div className={styles.login__form}>
                        <h1>Sign in</h1>
                        <p>
                            Get access to one of the best e-shopping services in the world
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues={{ login_email, login_password }}
                            validationSchema={loginValidation}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput
                                            type='text'
                                            name='login_email'
                                            icon='email'
                                            placeholder='Email Address'
                                            onChange={handleChange}
                                        />
                                        <LoginInput
                                            type='password'
                                            name='login_password'
                                            icon='password'
                                            placeholder='Password'
                                            onChange={handleChange}
                                        />
                                        <CircledIconButton type='submit' text='Sign In' />
                                        <div className={styles.forgot}>
                                            <Link href='/forget'>Forgot password?</Link>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                        <div className={styles.login__socials}>
                            <span className={styles.or}>Or continue with</span>
                            <div className={styles.login__socials_wrap}>
                                {
                                    providers.map((provider) => (
                                        <div key={provider.name}>
                                            <button
                                                className={styles.social__btn}
                                                onClick={() => signIn(provider.id)}
                                            >
                                                <img
                                                    src={`../../icons/${provider.name}.png`}
                                                    alt={`${provider.name} logo`}
                                                />
                                                Sign in with {provider.name}
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.login__container}>
                    <div className={styles.login__form}>
                        <h1>Sign up</h1>
                        <p>
                            Get access to one of the best e-shopping services in the world
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name, email, password, conf_password
                            }}
                            validationSchema={registerValidation}
                            onSubmit={() => signUpHandler()}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput
                                            type='text'
                                            name='name'
                                            icon='user'
                                            placeholder='Full Name'
                                            onChange={handleChange}
                                        />
                                        <LoginInput
                                            type='text'
                                            name='email'
                                            icon='email'
                                            placeholder='Email'
                                            onChange={handleChange}
                                        />
                                        <LoginInput
                                            type='password'
                                            name='password'
                                            icon='password'
                                            placeholder='Password'
                                            onChange={handleChange}
                                        />
                                        <LoginInput
                                            type='password'
                                            name='conf_password'
                                            icon='password'
                                            placeholder='Re-Type Password'
                                            onChange={handleChange}
                                        />
                                        <CircledIconButton type='submit' text='Sign Up' />
                                    </Form>
                                )
                            }
                        </Formik>
                        <div>{success && <span>{success}</span>}</div>
                        <div>{error && <span>{error}</span>}</div>
                    </div>
                </div>
            </div>
            <Footer country={{}} />
        </>
    )
}

export async function getServerSideProps(context) {
    const providers = Object.values(await getProviders());
    return {
        props: { providers },
    };
}
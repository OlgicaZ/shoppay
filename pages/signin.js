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

const initialValues = {
    login_email: "",
    login_password: "",
}

export default function signin() {

    const [user, setUser] = useState(initialValues);
    const { login_email, login_password } = user;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user,[name]: value})
    }

    const loginValidation = Yup.object({
        login_email: Yup.string()
            .required('Email address is required')
            .email('Please enter a valid email address'),

        login_password: Yup.string()
            .required('Please enter a password')
    });

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
                            initialValues={{login_email, login_password}}
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
                                        <CircledIconButton type='submit' text='Sign In'/>
                                        <div className={styles.forgot}>
                                            <Link href='/forget'>Forgot password?</Link>
                                        </div>
                                    </Form>  
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer country={{}} />
        </>
    )
}
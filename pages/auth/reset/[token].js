import Header from '@/components/header';
import styles from './../../../styles/forgot.module.scss';
import Footer from '@/components/footer';
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from 'next/link';
import { Formik, Form } from "formik";
import LoginInput from '@/components/inputs/logininput';
import CircledIconButton from '@/components/inputs/buttons/circledIconBtn';
import { useState } from 'react';
import * as Yup from 'yup';
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getSession, signIn } from 'next-auth/react';

export default function reset({ user_id }) {

    console.log('user id: ', user_id);

    const [password, setPassword] = useState('');
    const [conf_password, setConf_Password] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const resetHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/api/auth/reset', {
                user_id,
                password
            });

            let options = {
                redirect: false,
                email: data.email,
                password: password
            }

            await signIn('credentials', options);

            setError('');
            setLoading(false);

            window.location.reload(true);
        } catch (error) {
            setLoading(false);
            setError('Please try again');
        }
    }

    const passwordValidation = Yup.object({
        password: Yup.string()
            .required('Please enter your new password')
            .min(6, 'Password must be at least 6 characters')
            .max(36, 'Password cannot be more than 36 characters'),
        conf_password: Yup.string()
            .required('Confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
            <Header country={{}} />
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>Reset your password? <Link href='/'>Login instead</Link></span>
                    </div>
                    <div className={styles.login__form}>
                        <Formik
                            enableReinitialize
                            initialValues={{ password, conf_password }}
                            validationSchema={passwordValidation}
                            onSubmit={() => {
                                resetHandler();
                            }}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput
                                            type='password'
                                            name='password'
                                            icon='password'
                                            placeholder='Password'
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <LoginInput
                                            type='password'
                                            name='conf_password'
                                            icon='password'
                                            placeholder='Confirm Password'
                                            onChange={(e) => setConf_Password(e.target.value)}
                                        />
                                        <CircledIconButton type='submit' text='Submit' />
                                        <div style={{ marginTop: '10px' }}>
                                            {
                                                error && <span className={styles.error}>{error}</span>
                                            }
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
    );
}

export async function getServerSideProps(context) {
    const { query, req } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: {
                destination: '/',
            }
        }
    }

    const token = query.token;
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

    return {
        props: {
            user_id: user_id.id,
        }
    }
}
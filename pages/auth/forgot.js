import Header from '@/components/header';
import styles from './../../styles/forgot.module.scss';
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

export default function forgot() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const forgotHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/forgot', {
                email
            });
            setError('');
            setSuccess(data.message);
            setLoading(false);
            setEmail("");
        } catch (error) {
            setLoading(false);
            setSuccess('');
            setError(error.response.data.message);
        }
    }

    const emailValidation = Yup.object({
        email: Yup.string()
            .required('You will need this when you log in and if you ever need to reset your password')
            .email('Enter a valid email address'),
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
                        <span>Forgot your password? <Link href='/'>Login instead</Link></span>
                    </div>
                    <div className={styles.login__form}>
                        <Formik
                            enableReinitialize
                            initialValues={{ email }}
                            validationSchema={emailValidation}
                            onSubmit={() => {
                                forgotHandler();
                            }}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput
                                            type='text'
                                            name='email'
                                            icon='email'
                                            placeholder='Email Address'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <CircledIconButton type='submit' text='Send Link' />
                                        <div style={{ marginTop: '10px' }}>
                                            {
                                                error && <span className={styles.error}>{error}</span>
                                            }
                                            {
                                                success && <span className={styles.success}>{success}</span>
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
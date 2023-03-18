import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/login.module.css';

import{login} from '../api';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoggingIn(true);

        if(!email || !password){
            return  toast("Please Enter both email and password",{
            appearance: 'error',
            autoDismiss: true
            });
        }

        const response = await login(email, password);

        if(response.success) {
            toast("succeessFully logged in",{
                appearance: 'success',
        });
        }else{
            return toast(response.message, {
                appearance: 'error',
            });
        }

        setLoggingIn(false);
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Log in</span>

            <div className={styles.field}>
                <input
                    type="email" 
                    placeholder="Email" 
                     
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input 
                    type="password" 
                    placeholder="password" 
                     
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.field} disabled={loggingIn}>
                <button disabled={loggingIn}>
                    {loggingIn ? 'logging In.....' : 'Log In'}
                    <ToastContainer />
                </button>
            </div>
        </form>
    );
};


export default Login;
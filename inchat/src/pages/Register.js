import styles from '../styles/login.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate, useNavigate} from 'react-router-dom';

const Register = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signup, setSignUp] = useState('');
    const auth = useAuth();
    const history = useNavigate();

    console.log("sdsd",history);
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setSignUp(true);

        let error = false;
        if(!name || !email || !password || !confirmPassword){
            toast('Please fill all the details carefully', {
                appearance: 'error',
                autoDismiss: true
            });
        }
        if(password !== confirmPassword){
            toast("Password Doesn't match", {
                appearance: 'error',
                autoDismiss: true
            });

            error = true;
        }

        if(error){
            return setSignUp(false);
        }

        // Setting up the Sign Up Response
        console.log(name, email, password, confirmPassword);
        const response = await auth.signup(name, email, password, confirmPassword);
        if(response.success){
            history('/login');
            setSignUp(false);

            return toast("User Regisered successfully, Please Login in now!!",{
                appearance: 'success',
                autoDismiss: true
            });
        }else{
            toast(response.message, {
                appearance: 'error',
                autoDismiss: true
            });
        }

        setSignUp(false);
    };


    if(auth.user){
        return <Navigate to= '/' />
    }

    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <span className={styles.loginSignupHeader}>Register</span>

            <div className={styles.field}>
                <input
                    type="text" 
                    placeholder="Name" 
                    autoComplete='new-password'
                    value= {name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    type="email" 
                    placeholder="Email" 
                    autoComplete='new-password'
                    value= {email}
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
            <div className={styles.field}>
                <input 
                    type="password" 
                    placeholder="confirm password" 
                     
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <button disabled={signup} >
                    {signup ? "Signing Up..." : "Sign Up"}
                    <ToastContainer />
                </button>
            </div>
        </form>
    )

}


export default Register;
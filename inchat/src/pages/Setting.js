import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const auth = useAuth();

  
  const [editMode, setEditMode] =  useState(false);
  const [name, setName] =  useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] =  useState('');
  const [confirmPassword, setConfirmPassword] =  useState('');
  const [savingForm, setSavingForm] =  useState(false);


  // setting up the clear function
  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  }


  // adding update profile function
  const updateProfile = async () => {
    setSavingForm(true);

    let error = false
    if(!name || ! password || !confirmPassword){
      toast("please fill the fields", {
        apperance: 'error'
      });

      error = true;

    }

    if(password !== confirmPassword) {
      toast("password and confirm password doesn't match", {
        apperance: 'error'
      });

      error = true;
    }

    if(error){
      return setSavingForm(false);
    }

    const response =await auth.updateUser(auth.user._id, name, password, confirmPassword);

    if(response.success){
      setEditMode(false);
      setSavingForm(false);
      clearForm();

      return toast("User update successfully", {
        apperance: 'success'
      });
    }else{
      toast(response.message,{
        apperance: 'error',
      })
    }


    setSavingForm(false);

  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="user image"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        { editMode ? (<input 
        type = "text"
        value={name}
        onChange = { (e) => setName(e.target.value)}
        />
        ) : (
        <div className={styles.fieldValue}>{auth.user?.name}</div>)}
      </div>


      {editMode && (
        <>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Password</div>
          <input 
            type="password" 
            value={password}
            onChange = { (e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Confirm Password</div>
          <input 
            type="password" 
            value={confirmPassword}
            onChange = { (e) => setConfirmPassword(e.target.value)}
            />
        </div>
        </>
      )}


      <div className={styles.btnGrp}>

        {editMode ? (
          <>
            <button className={`button ${styles.saveBtn}`} onClick={updateProfile}>
              {savingForm ? 'saving profile...' : 'save profile'}
              <ToastContainer />
            </button>
            <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>Go back
            
            </button>

          </>
        ) : (

          <button className={`button ${styles.editBtn}`}  onClick={() => setEditMode(true)}>Edit Profile</button>
        )
      
      }

      </div>
    </div>
  );
};

export default Settings;

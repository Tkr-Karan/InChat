import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';


const Navbar = () => {

  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  // adding auth so we can display the user if it successfully authenticatte
  const auth = useAuth();


  // Here we are using the useEffect hooks for fetching the user from the search box
  useEffect(() => {
    const fetchUser = async () => {
      const response = await searchUsers(searchText);

      if(response.success){
        setResult(response.data.users);
      }
    }
    
    if(searchText.length > 2){
      fetchUser();
    }else{
      setResult([]);
    }

  }, [searchText]);



  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt="Inchat"
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.searchContainer}>
        <img className={styles.searchIcon} src='https://cdn-icons-png.flaticon.com/512/2811/2811806.png' />

        <input placeholder='search user' value={searchText} onChange={(e) => setSearchText(e.target.value)} />

        {result.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {result.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key = {`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/9131/9131529.png'  
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>         
        )}

      </div>
 
      <div className={styles.rightNav}>
        {/* checking is the user exist or not */}
        { auth.user && ( <div className={styles.user}>
          <Link to="/user-settings">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>{auth.user.name}</span>
        </div> 
        )}
        <div className={styles.navLinks}>
          <ul>
            {/* putting the conditon if the user is exit then show Logout otherwise show Login as well as Register */}
          {auth.user ? (
            <>
              <li onClick={auth.logout}>
                LogOut 
                {/* <a href="/">Log in</a> */}
              </li>
            </>
          ): (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/sign-up">Register</Link>
              </li>
            </>
          )}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

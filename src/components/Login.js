import React, { useState, useRef } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';
import './css/Login.css';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Login() {

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const {
    setUserId,
    setShowLogin
  } = useGlobalStore();


  function handleSignIn(id) {
    setUserId(Number(id));
    setShowLogin(false);
  }

  function handleSignUp() {
    setShowSignUpForm(false);
  }

  return (
    <Container className='login__container' maxWidth='sm' >
      {showSignUpForm ? 
        <SignUp handleSignUp={handleSignUp} /> : 
        <SignIn handleSignIn={handleSignIn} setShowSignUpForm={setShowSignUpForm} /> 
      }
    </Container>
  );
}

function SignIn({handleSignIn, setShowSignUpForm}) {

  const numberRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState({
    number: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = numberRef.current.value;
    const passwordValue = passwordRef.current.value;

    if(!inputValue) {
      setError({number: 'Phone number cannot be empty', password: ''});
      return;
    }
    if(inputValue.length !== 10) {
      setError({number: 'Please enter a valid 10 digit phone number', password: ''});
      return;
    }
    if(!passwordValue) {
      setError({number: '', password: 'Password cannot be empty'});
      return;
    }
    if(passwordValue.length < 6) {
      setError({number: error.name, password: 'Password should contain atleast 6 characters'});
      return;
    }
    projectDatabase
      .collection('users')
      .doc(inputValue.toString())
      .get()
      .then((doc) => {
        if(doc.exists) {
          if(doc.data().password === passwordValue) {
            handleSignIn(inputValue);
          } else {
            setError({number: '', password:'Incorrect password'});
          }
        } else {
          setError({number: '', password: 'There is no account with this number. \nClick on create a account.'});
        }
      })
      .catch(err => alert((err)));

  }

  return (
    <>
      <Typography variant='h4' align='center'>
        Sign in to your account
      </Typography>
      <form className='login__form'>
        <TextField
          fullWidth
          inputRef={numberRef}
          label='Phone number'
          type='number'
          size='medium'
          variant='filled' 
          helperText={error.number && error.number}
          />
        <TextField
          fullWidth
          inputRef={passwordRef}
          label='Password'
          type='password'
          size='medium'
          variant='filled'  
          helperText={error.password && error.password}
          />

        <Button fullWidth size='large' variant='contained' type='submit' onClick={handleSubmit} >
          sign in
        </Button>
        <Button fullWidth size='large' variant='contained' onClick={() => setShowSignUpForm(true)} >
          Create Account
        </Button>

      </form>
    </>
  );
}

function SignUp({handleSignUp}) {

  const [error, setError] = useState({
    name: '',
    number: '',
    password: ''
  });
  const numberRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    
    const numberValue = numberRef.current.value;
    const nameValue = nameRef.current.value;
    const passwordValue = passwordRef.current.value;
    
    if(numberValue.length === 0) {
      setError({ name: '', number: 'Phone number cannot be empty' });
      return;
    }
    if(nameValue.length === 0) {
      setError({ name: 'Name cannot be empty', number: '' });
      return;
    }
    if(numberValue.length !== 10) {
      setError({ name: '', number: 'Enter 10 digits valid phone number' });
      return;
    }
    if(!passwordValue) {
      setError({name: '', number: '', password: 'Password cannot be empty'});
      return;
    }
    if(passwordValue.length < 6) {
      setError({name: '', number: '', password: 'Password should be atleast 6 characters long'});
      return;
    }

    projectDatabase
      .collection('users')
      .doc(numberValue.toString())
      .get()
      .then((doc) => {
        if(doc.exists) {
          setError({password: 'There is already a account with this number.\nClick on Sign In to log into your account.', name: '', number: ''});
        } else {
          projectDatabase
            .collection('users')
            .doc(numberValue.toString())
            .set({
              name: nameValue,
              password: passwordValue,
              conversations: [],
              contacts: []
            });
          handleSignUp();
        }
      });
  }

  return (
    <>
      <Typography variant='h4' align='center'>
        Create an account
      </Typography>
      <form className='login__form'>
        <TextField
          fullWidth
          inputRef={numberRef}
          label='Phone number'
          type='number'
          variant='filled'
          helperText={error.number} />
        <TextField
          fullWidth
          inputRef={nameRef}
          label='Name'
          variant='filled' 
          helperText={error.name} />
        <TextField
          fullWidth
          inputRef={passwordRef}
          label='Password'
          type='password'
          variant='filled'
          helperText={error.password && error.password} />

          <Button size='large' fullWidth type='submit' onClick={handleSubmit} >
            Add account
          </Button>
          <Button size='large' fullWidth type='submit' onClick={handleSignUp} >
            Sign In 
          </Button>
      </form>
    </>
  );
}
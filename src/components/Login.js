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
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = numberRef.current.value;

    if(!inputValue) {
      setError('Phone number cannot be empty');
      return;
    }else if(inputValue.length !== 10) {
      setError('Please enter a valid 10 digit phone number');
      return;
    }
    projectDatabase
      .collection('users')
      .doc(inputValue.toString())
      .get()
      .then((doc) => {
        if(doc.exists) {
          handleSignIn(inputValue);
        } else {
          setError('There is no account with this number. \nClick on create a account.');
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
          helperText={error && error}
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
    number: ''
  });
  const numberRef = useRef(null);
  const nameRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    
    const numberValue = numberRef.current.value;
    const nameValue = nameRef.current.value;
    
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

    projectDatabase
      .collection('users')
      .doc(numberValue.toString())
      .get()
      .then((doc) => {
        if(doc.exists) {
          setError({name: 'There is already a account with this number.\nClick on Sign In to log into your account.', number: ''});
        } else {
          projectDatabase
            .collection('users')
            .doc(numberValue.toString())
            .set({
              name: nameValue,
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
          size='medium'
          variant='filled'
          helperText={error.number} />
        <TextField
          fullWidth
          inputRef={nameRef}
          label='Name'
          size='medium'
          variant='filled' 
          helperText={error.name} />
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
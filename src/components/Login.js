import React, { useState, useRef } from 'react';
import { useGlobalStore } from './GlobalStore';
import './css/Login.css';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Typography';

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

  return (
    <Container className='login__container' maxWidth='sm' >
      {showSignUpForm ? 
        <SignUp /> : 
        <SignIn handleSignIn={handleSignIn} setShowSignUpForm={setShowSignUpForm} /> 
      }
    </Container>
  );
}

function SignIn({handleSignIn, setShowSignUpForm}) {

  const numberRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    handleSignIn(numberRef.current.value);
  }

  return (
    <>
      <Typography variant='h5' align='center'>
        Sign In
      </Typography>
      <form className='login__form'>
        <TextField
          inputRef={numberRef}
          label='Phone number'
          type='number'
          size='small'
          variant='filled' />

        <Button variant='contained' type='submit' onClick={handleSubmit} >
          sign in
        </Button>
        <Button variant='contained' onClick={() => setShowSignUpForm(true)} >
          Create Account
        </Button>

      </form>
    </>
  );
}

function SignUp() {
  return (
    <>
      <Typography variant='h5' align='center'>
        Sign Up
      </Typography>
      <form className='login__form'>
        <TextField
          label='Phone number'
          type='number'
          size='small'
          variant='filled' />
        <TextField
          label='Name'
          type='number'
          size='small'
          variant='filled' />
          <Button type='submit' >
            Add account
          </Button>
      </form>
    </>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';
import firebase from 'firebase/app';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';


export default function ContactList() {

  const [openDialog, setOpenDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { userId } = useGlobalStore();

  function handleClose() {
    setOpenDialog(false);
  }
  function handleOpen() {
    setOpenDialog(true);
  }

  useEffect(() => {

    const unsub = 
    projectDatabase.collection('users')
      .doc(userId.toString())
      .onSnapshot(doc => setContacts(doc.data().contacts), 
      err => alert(err));

    return () => {
      unsub();
    }

  }, [userId]);

  return (
    <Container className='contactList__container' disableGutters >
      <List>
        {  contacts && contacts.map(contact => <ContactListItem key={contact.userId} item={contact} />)}
      </List>

      <Fab onClick={handleOpen} >
        <AddIcon />
      </Fab>

      <DialogComponent openDialog={openDialog} handleClose={handleClose}/>
    </Container>
  );
}

function ContactListItem({item}) {

  const { setShowContactDetail, setShowContactUser } = useGlobalStore();

  return (
    <ListItem
      divider 
      button
      onClick={() => {
        setShowContactDetail(true);
        setShowContactUser(item);
      }} >
      <ListItemText primary={item.savedName} />
    </ListItem>
  );
}

function getConversationId(num1, num2) {
  if(num1 < num2) {
    return `${num1}_${num2}`;
  } else {
    return `${num2}_${num1}`;
  }
}

function DialogComponent({openDialog, handleClose}) {

  const [error, setError] = useState({
    name: '',
    number: ''
  });
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const { userId } = useGlobalStore();

  function handleAdd(e) {
    e.preventDefault();
    const nameValue = nameRef.current.value;
    const numberValue = numberRef.current.value;

    if(nameValue.length === 0) {
      setError({name: 'Name cannot be empty', number: ''});
      return;
    }
    if(numberValue.length === 0) {
      setError({name: '', number:'Number cannot be empty'});
      return;
    }
    if(numberValue.length !== 10) {
      setError({name: '', number:'Please enter a 10 digits valid phone number'});
      return;
    }
    const conversationId = getConversationId(userId, Number(numberValue));
    let newContact = {
      conversationId,
      savedName: nameValue,
      userId: Number(numberValue)
    }
    if(newContact) {
      projectDatabase
        .collection('users')
        .doc(userId.toString())
        .update({
          contacts: firebase.firestore.FieldValue.arrayUnion(newContact)
        });

        newContact = {};
    }
    handleClose();
  }

  return (
    <Dialog
    className='contactlist__dialog'
    open={openDialog}
    onClose={handleClose}>
    <DialogTitle>Create Contact</DialogTitle>
    <DialogContent>
        <form className='contactdialog__form' onSubmit={handleAdd} >
          <TextField 
            fullWidth
          inputRef={nameRef} 
          variant='filled'
          helperText={error.name && error.name} 
          label='Name' />
          <TextField
            fullWidth
            type='number'
            inputRef={numberRef}
            variant='filled'
            helperText={error.number && error.number} 
            label='Number' />
            <button type='submit'></button>
        </form>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleAdd} color="primary" autoFocus>
        Add
      </Button>
      </DialogActions>
    </Dialog>
  );
}
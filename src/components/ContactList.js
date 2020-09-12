import React, { useEffect, useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ContactList() {

  const [contacts, setContacts] = useState([]);
  const { userId } = useGlobalStore();
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
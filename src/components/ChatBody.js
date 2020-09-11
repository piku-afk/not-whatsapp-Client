import React, { useRef, useEffect } from 'react';
import { useGlobalStore } from './GlobalStore';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function scrollToBottom(ref) {
  window.scrollTo(0, ref.current.offsetTop);
};

export default function ChatBody({messages}) {

  const bottomRef = useRef(null);
  const { userId } = useGlobalStore();

  useEffect(() => {
    scrollToBottom(bottomRef);
  }, [messages]);

  return (
    <Container className='chat__body'>
      {messages.map(message => (
        <Message key={message.id} message={message} userId={userId} />
      ))}
      <div ref={bottomRef} id='bottom-div' />
    </Container>
  );
}

function Message({message, userId}) {
  const sender = message.sender === userId;
  return (
    <>
      <Paper className={`${sender && 'right'}`} elevation={1}>
        <Typography variant='body1'>
          {message?.body}
        </Typography>
      </Paper>

    </>
  );
}
import React from 'react';
import MainNav from './MainNav';
import MainContent from './MainContent';

import Container from '@material-ui/core/Container';

export default function MainMenu() {
  return (
    <Container maxWidth='sm' disableGutters >
      <MainNav />
      <MainContent />
    </Container>
  );
}
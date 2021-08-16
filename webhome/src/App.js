import './App.css';

// @material
import { Box, Container }from '@material-ui/core';

// components
import Form from './components/form';
import Content from './components/content';

function App() {
  return (
    <Box component="span" m={1}>
      <Container className="app-container" fixed maxWidth="md">
        <Form />
        <Content />        
      </Container>
    </Box>
  );
}

export default App;

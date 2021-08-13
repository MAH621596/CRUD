import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react';
import FirebaseCrud from './FirebaseCrud';
import firebase from 'firebase';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    
    <Container>
      <FirebaseCrud></FirebaseCrud>


    </Container>
    
  );
}

export default App;

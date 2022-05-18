import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import NoteForm from './components/NoteForm';
import NoteIndex from './components/NoteIndex';
import NoteList from './components/NoteList';
function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        {/* <Route path="/" element={<NoteList/>}/> */}
        <Route path="/edit/:id" element={<NoteForm/>}/>
        <Route path="/new-note" element={<NoteForm/>}/>
        <Route path="/home" element={<NoteIndex/>}/>
        <Route path="/" element={<NoteList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import AstroGym from './astrogym';

function App() {
    return (
        <Routes>
            <Route path="/" Component={AstroGym}/>
           </Routes>
    )

}

export default App;


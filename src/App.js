import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import Ligue1 from './Components/Pages/Liste/Ligue1/Ligue1';
import PremierLeague from './Components/Pages/Liste/PremierLeague/PremierLeague';
import Bundesliga from './Components/Pages/Liste/Bundesliga/Bundesliga';
import SerieA from './Components/Pages/Liste/SerieA/SerieA';
import LaLiga from './Components/Pages/Liste/LaLiga/LaLiga';
import NBA from './Components/Pages/Liste/NBA/NBA';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Ligue1 />}></Route>
        <Route exact path="/premierleague" element={<PremierLeague />}></Route>
        <Route exact path="/laliga" element={<LaLiga />}></Route>
        <Route exact path="/bundesliga" element={<Bundesliga />}></Route>
        <Route exact path="/seriea" element={<SerieA />}></Route>
        <Route exact path="/nba" element={<NBA />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

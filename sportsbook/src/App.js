import './App.css';
import {Route, Link} from 'react-router-dom';
import GameLines from './Components/gameLines';
import Tests from "./Components/tests";

function App() {
  return (
    <div className="App">
      <Route exact path='/'>        
        <GameLines/>
        <Link onClick={Tests} to='/tests'>
          <h3>Tests</h3>
        </Link>
      </Route>
      <Route path='/tests'>
        <Tests/>
      </Route>
    </div>
  );
}

export default App;

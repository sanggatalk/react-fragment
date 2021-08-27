import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './page';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" component={Main}/>
      </Switch>
    </Router>
  )
}

export default App;
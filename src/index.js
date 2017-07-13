import React from 'react';
import { render } from 'react-dom';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/App';
import Search from './components/Search'; 
import registerServiceWorker from './registerServiceWorker';
import './styles/css/style.css';

const Root = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/search" component={Search}/>
      </div>
    </Router>
  )
};

render(<Root/>, document.getElementById('root'));
registerServiceWorker();

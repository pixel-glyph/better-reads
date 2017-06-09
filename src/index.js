import React from 'react';
import { render } from 'react-dom';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const Root = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </Router>
  )
};

render(<Root/>, document.getElementById('root'));
registerServiceWorker();

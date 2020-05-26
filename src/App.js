import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Menu from './Views/Menu';

import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
        <div>
          <Route exact path="/menu/:id" component={Menu} />
        </div>
    </Router>
  );
}

export default App;

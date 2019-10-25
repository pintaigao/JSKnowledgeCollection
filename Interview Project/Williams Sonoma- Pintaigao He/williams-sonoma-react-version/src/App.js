import React from 'react';
import * as history from 'history';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import MainPage from './Pages/Main';
import DetailPage from './Pages/Detail';
const histories = history.createBrowserHistory()

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={histories}>
        <div>
          <Switch>
            <Route path="/" component={MainPage} exact={true} />
            <Route path="/item/:id" component={DetailPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

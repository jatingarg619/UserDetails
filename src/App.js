import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootEpic } from './app/container/epics'
import { rootReducer } from './app/container/reducers'
import {Login, Toaster} from './common/container'
import {UserDetails} from './app/container'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);
epicMiddleware.run(rootEpic)



class App extends Component {
  render() {
    return (
    <Provider store={store}> 
      <div className="App">
          <Router>
              <Switch>
                  <Route path='/' exact component={Login}/>
                   <Route path='/User'  component={UserDetails}/>
              </Switch>
              <Toaster/>
          </Router>
      </div>
    </Provider>  
    );
  }
}

export default App;

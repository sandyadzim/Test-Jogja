import React, { Component } from 'react';
import SwitchNav from './src/navigation/RootNav';
import { Provider, connect } from 'react-redux';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { store } from './src/redux/store';

const AppNav = createReduxContainer(SwitchNav, 'root');

const mapStateToProps = state =>  ({
  state: state.router
})
const AppWithNavigationState = connect(mapStateToProps)(AppNav)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNav />
      </Provider>
      
    );
  }
}

export default App;
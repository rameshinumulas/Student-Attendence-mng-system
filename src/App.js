import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './REDUX/Store';
import Routsfile from './Routing/Routsfile';
import Collegeimg from './views/images/Collegeimg';
import Menubar from './views/Menubar';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Menubar />
      <Routsfile />
    </div>
    </Provider>
  );
}

export default App;

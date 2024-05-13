import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MapComponent from './components/MapComponent';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MapComponent />
    </Provider>
  );
}

export default App;

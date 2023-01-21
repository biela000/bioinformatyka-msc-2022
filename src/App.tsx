import React from 'react';
import { Provider } from "react-redux";
import { proteinStore } from './store/store';
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Provider store={proteinStore}>
      <div className="app" data-testid="AppComponent">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;

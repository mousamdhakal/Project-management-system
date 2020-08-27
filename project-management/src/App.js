import React from 'react';
import Header from './containers/header/header';

function App(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import Todos from './components/todo/Todo';


function App() {
  return (
    <div className="w-full h-full border-box mx-auto p-[35px] flex items-center justify-center bg-gradient-to-r bg-gradient-to-r from-cyan-50 to-blue-300">
      <Todos  />
    </div>
  );
}

export default App;

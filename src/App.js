import React from 'react';
import './App.css';
import UsersList from "./components/class/UsersList";
import UsersListFunctional from"./components/functional/UsersList"

function App() {
  return (
    <div className="App">
      <UsersList />
      <UsersListFunctional />
    </div>
  );
}

export default App;

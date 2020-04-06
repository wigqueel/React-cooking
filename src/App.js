import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Recipes from './Recipes';
import Add from './Edit';
import Edit from './Add';
import DetailRecipes from './DetailRecipes';
import Nav from './Nav';

function App() {


  return (
    <Router>
    <div className="App">
    <Nav />
    <Switch>
      <Route path = "/" exact component = {Recipes}/>
      <Route path = "/recipes" exact component = {Recipes}/>
      <Route path = "/recipes/:recipeId" exact component = {DetailRecipes}/>
      <Route path = "/add"  component = {Add}/>
      <Route path = "/edit/:recipeId "  component = {Edit}/>
    </Switch>

    </div>  
    </Router>
  );
}

export default App;

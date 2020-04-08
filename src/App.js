import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Recipes from './Recipes';
import Add from './Add';
import Edit from './Edit';
import DetailRecipes from './DetailRecipes';
import Nav from './Nav';
import About from './About'
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
      <Route path = "/edit/:recipeId"  component = {Edit}/>
      <Route path = "/about"  component = {About}/>
    </Switch>

    </div>  
    </Router>
  );
}

export default App;

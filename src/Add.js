import React, { useState } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

function Add() {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState({ title: "", category: "", shortDesc: "", longDesc: "" });
  const handleChange = function (e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value })
    console.log(recipe);
    console.log(e.target);
    
  }

  let history = useHistory();
  const handleSubmit = function () {
   
    
    console.log({recipe, createDate:new Date().getTime() });

    
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...recipe, createDate:new Date().getTime() })
      };
      fetch('http://localhost:3000/recipes', requestOptions)
          .then(history.push("/"))
          
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  
  }
  return (

    <div className="add-menu">
      <h3 className="add-h q">
        Add recipe
      </h3>
      <Container>
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl className="add-form"
              placeholder="title:"
              onChange={
                handleChange
              }
              name="title"
              value={recipe.title}
            />
            <FormControl className="add-form"
              placeholder="category:"
              onChange={
                handleChange
              }
              name="category"
              value={recipe.category}
            />
            <FormControl className="add-form"
              placeholder="shortDesc:"
              onChange={
                handleChange
              }
              name="shortDesc"
              value={recipe.shortDesc}
            />
            <FormControl className="add-form"
              placeholder="longDesc:"
              onChange={
                handleChange
              }
              name="longDesc"
              value={recipe.longDesc}
            />

          </InputGroup>
         <div class="butt-ed">
          <Button type="submit" className="add-button" variant="success">Add</Button>{' '}
          <Button as={Link} to={"/recipes" } className="edit-butt d" variant="dark">Back</Button>{' '}
          </div>
        </form>
      </Container>

    </div>
  )
}

export default Add;

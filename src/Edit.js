import React, { useState, useEffect } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


function Edit() {
  const [recipe, setRecipe] = useState({ title: "", category: "", shortDesc: "", longDesc: "" });
  let { recipeId } = useParams();
  const handleChange = function (e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value })

  }
  let history = useHistory();
  const handleSubmit = function (e) {

    e.preventDefault();
    console.log({ recipe, createDate: new Date().getTime() });


    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...recipe, createDate: new Date().getTime() })
    };
    fetch('http://localhost:3000/recipes/' + recipeId, requestOptions)
      .then(response => response.json())
      .then(history.goBack())

  }

  useEffect(() => {
    fretchItems();
  }, []);

  const fretchItems = async () => {
    const data = await fetch('http://localhost:3000/recipes/' + recipeId);

    const recipe = await data.json();
    console.log(recipe);
    setRecipe(recipe);
  }

  return (
    <div>
      <Container>
        <h2 ></h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label className="text-left" >Title:</Form.Label>
            <Form.Control 
              className="add-form mb-3"
              onChange={
                handleChange
              }
              name="title"
              value={recipe.title}
              type="text"
              placeholder="Enter title:"
            />
          </Form.Group>
          <Form.Label className="text-left" >Сategory:</Form.Label>
          <FormControl className="add-form mb-3"
            placeholder="category:"
            onChange={
              handleChange
            }
            name="category"
            value={recipe.category}
          />
          <Form.Label className="text-left" >Short Description:</Form.Label>
          <FormControl className="add-form mb-3"
            placeholder="shortDesc:"
            onChange={
              handleChange
            }
            name="shortDesc"
            value={recipe.shortDesc}
          />
          <Form.Label className="text-left" >Long Description</Form.Label>
          <FormControl className="add-form mb-3"
            placeholder="longDesc:"
            onChange={
              handleChange
            }
            name="longDesc"
            value={recipe.longDesc}
          />
          <div className= "butt-ed">
          <Button type="submit" className="add-button d" variant="info">Edit</Button>
          <Button as={Link} to={"/recipes/" + recipeId} className="edit-butt d" variant="dark">Back</Button>{' '}
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default Edit;

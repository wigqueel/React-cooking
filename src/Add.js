import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Add() {

  const [recipe, setRecipe] = useState({ title: "", category: "", shortDesc: "", longDesc: "" });
  const handleChange = function (e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value })
    console.log(recipe);
    console.log(e.target);
  }
  const handleSubmit = function (e) {
    e.preventDefault();
    
    console.log({recipe, createDate:new Date().getTime() });
  }
  return (

    <div className="add-menu">
      <h3 className="add-h">
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
          <Button type="submit" className="add-button" variant="success">Add</Button>{' '}
        </form>
      </Container>

    </div>
  )
}

export default Add;

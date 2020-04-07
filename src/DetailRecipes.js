import React, { useEffect, useState } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import bbq from "./img/bbq.jpg";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function DetailRecipes() {

  useEffect(() => {
    fretchItems();
  }, []);

  let { recipeId } = useParams();
  const [items, setItems] = useState([]);

  const fretchItems = async () => {
    const data = await fetch('http://localhost:3000/recipes/' + recipeId);

    const items = await data.json();
    console.log(items);
    setItems(items);
  }

  return (

    <div>
     
      <div className="detail-page">

        <Image fluid src={bbq} alt="Smiley face" className="photo-bbq" />

        <div className="items-long">
          <h1> {items.title}</h1>
          <p className="short-desc">{items.longDesc} </p>
        </div>
      </div>

      
      <Button as={Link} to={"/edit/"+recipeId} className = "edit-butt" variant="success">Edit</Button>{' '}
      <Button className = "delete-butt" variant="danger">Delete</Button>{' '}
      
    </div>
  );
}

export default DetailRecipes;

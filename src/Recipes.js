import React, { useEffect, useState } from 'react';
import './App.scss';
import {Link} from 'react-router-dom';


function Recipes() {
useEffect(() => {
    fretchItems();
}, []);

const [items, setItems] = useState([]);

 const fretchItems = async () =>
 {
     const data = await fetch('http://localhost:3000/recipes');
     
     const items = await data.json();
     console.log(items);
     setItems(items);
 }

  return (
    <div>
        <h1>Recipes Page</h1>
            
            {items.map(item => (
                <Link to={"/recipes/" + item.id} className = "items">
                
                <h1> {item.title}</h1>
                <p>{item.shortDesc} </p>
                </Link>
                 ))}
            

    </div>
  );
}

export default Recipes;

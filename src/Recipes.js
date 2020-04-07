import React, { useEffect, useState } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import bbq from "./img/bbq.jpg";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Recipes() {
    useEffect(() => {
        fretchItems();
    }, []);
    const [sortAsc, setSortAsc] = useState(!!localStorage.getItem('sortAsc'));
    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState("");
const handleChange = function (e) {
    setSearchInput(e.target.value)
}

    const fretchItems = async () => {
        const data = await fetch('http://localhost:3000/recipes');

        const items = await data.json();
        console.log(items);
        setItems(items);
    }

    const sortByDate = (recipes) => {
        return recipes.sort((a, b) => {
          return sortAsc ? a.createDate - b.createDate : b.createDate -
            a.createDate;
        });
      };
    
      const filterAndSortRecipes = (recipes) => {
        return sortByDate(recipes);
      };

    return (
        <div className="recipes-body">
            <Container>
            <h1 className="q">Recipes Page</h1>
            
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Find your recipe"
                        aria-label="Recipient's "
                        aria-describedby="basic-addon2"
                        onChange={
                            handleChange
                        }
                        value={searchInput}
                    />
                    <Link key to={"/Add"} >
                    <Button className = "Add-butt" variant="success">Add</Button>{' '}
                    </Link>
                </InputGroup>
            </Container>

            { filterAndSortRecipes(items).filter(function(el) {
             return (el.title.toLowerCase().includes(searchInput.toLowerCase()))
            }
            ).map(item => (
                <Link key={item.id} to={"/recipes/" + item.id} >
                    <div className="items-and-photo">

                        <Image fluid src={bbq} alt="Smiley face" className="photo-bbq" />

                        <div className="items">
                            <h1> {item.title}</h1>
                            <p className="short-desc">{item.shortDesc} </p>
                        </div>
                    </div>
                </Link>
            ))}


        </div>
    );
}

export default Recipes;

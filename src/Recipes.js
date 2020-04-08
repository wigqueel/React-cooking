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

    const [searchInput, setSearchInput] = useState(localStorage.getItem("searchInput") || "");
    const [searchCategory, setSearchCategory] = useState(localStorage.getItem("searchCategory") || "");
    const handleChange = function (e) {
        setSearchInput(e.target.value)
        localStorage.setItem("searchInput", e.target.value);
    }
    const handleCatChange = function (e) {
        setSearchCategory(e.target.value)
        localStorage.setItem("searchCategory", e.target.value);
    }
    const fretchItems = async () => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:3000/recipes', requestOptions)
            .then(response => response.json())
            .then(response => setItems(response))

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
                        <Button className="Add-butt" variant="success">Add</Button>{' '}
                    </Link>
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Find your category"
                        aria-label="Recipient's "
                        aria-describedby="basic-addon2"
                        onChange={
                            handleCatChange
                        }
                        value={searchCategory}
                    />

                </InputGroup>
            </Container>




            {filterAndSortRecipes(items).filter(function (el) {
                return (el.title.toLowerCase().includes(searchInput.toLowerCase()))
            }
            ).filter(function (el) {
                return (el.category.toLowerCase().includes(searchCategory.toLowerCase()))
            }).map(item => (
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

import React, { useEffect, useState } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import bbq from "./img/bbq.jpg";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import { useParams } from "react-router";
import Container from 'react-bootstrap/Container';

function Recipes() {
    
    let { recipeId } = useParams();
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
    
    let history = useHistory();
    const handleSubmit = function (recipeId) {
        console.log(recipeId)
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:3000/recipes/' + recipeId, requestOptions)
            .then(refresh())

    }

    const refresh = function () {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:3000/recipes', requestOptions)
            .then(response => response.json())
            .then(response => setItems(response))

    }
    useEffect(() => {
        refresh();
    }, []);
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
                <>
                    <Link key={item.id} to={"/recipes/" + item.id} >
                        <div className="items-and-photo">

                            <Image fluid src={bbq} alt="Smiley face" className="photo-bbq" />

                            <div className="items">
                                <h1> {item.title}</h1>
                                <p className="short-desc">{item.shortDesc} </p>
                            </div>
                        </div>
                    </Link>

                    <div className="buttons-e-d">
                        <Button as={Link} to={"/edit/" + item.id} className="edit-butt" variant="success">Edit</Button>{' '}

                        <Button onClick={() => handleSubmit(item.id)} className="delete-butt" variant="danger">Delete</Button>{' '}

                    </div>
                </>
            ))}


        </div>
    );
}

export default Recipes;

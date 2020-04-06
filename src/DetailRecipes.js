import React, { useEffect, useState } from 'react';
import './App.scss';
import {Link} from 'react-router-dom';
import { useParams} from "react-router";

function DetailRecipes() {

    let { recipeId } = useParams();


  return (
    <div>
        {recipeId};

    </div>
  );
}

export default DetailRecipes;

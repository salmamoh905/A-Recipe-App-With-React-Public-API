import React,{useState, useEffect} from 'react';
import Recipe from './Recipe';
import logo from './logo.svg';
import './App.css';


function App() {
  // this is a api keys
  const APP_ID="7a234cdb";
  const APP_KEY="822b5b5b933391e71b7dd0d44bc53ff5	";
  //const example=`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

 //const [counter,setCounter] = useState(0);



 //useState)
  const [recipes,setRecipes] =useState([]);

 //creating a state for search
 const [search,setSearch] = useState("");

 //creating a state for querry 
 const [query,setQuery] = useState("chicken");


  useEffect(() =>{
      // console.log("useEffect has been run");
       //if you want to render the page once and not everytime then you add a single array[]
       // we can have async and await function in the useEffect but to make it more simpler we will declare outside the useEffect 
    getRecipes();
  },[query]);
 //getRecipes is an arrow function
  const getRecipes = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
   
    setRecipes(data.hits);
    console.log(data.hits);
  }

  //a function for the search
  const updateSearch = e =>{
    setSearch(e.target.value);
    //console.log(search);

  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
    <form onSubmit={getSearch} className="form-search">
      <input 
      className="search-bar"
      type="text"
      value={search} 
      onChange={updateSearch}></input>
      <button className="search-button" type="submit">Search</button>
      {/* <buton onClick={()=> setCounter(counter +1)}  type="submit">{counter}</buton> */}
    </form>

    {/* mapping  using the parethesis instead of the curly braces is because of we want to use html or jsx */}
    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe
      key={recipe.recipe.label}
       title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      /* use of props to access the needed */
    ))};

    </div>
    
    </div>
  );
}

export default App;

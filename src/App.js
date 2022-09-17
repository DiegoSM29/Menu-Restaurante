import './App.css';
import React, {useState, useEffect} from 'react';
import {  
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import db from './Firebase/firebaseConfig';
//Components
import RestaurantForm from './components/restaurantForm';
import Restaurant from './components/restaurant';
import Restaurants from './components/restaurants';

function App() {

  const [restaurants, setRestaurants] = useState([]) 

  useEffect ( () => {    
    const consulta = query(collection(db,"restaurants"), where("ownerId", "==", "WeQX8Ve7BHb3dnU3Lud8"));

      getDocs(consulta)
        .then(items => {
          const restaurants = items.docs.map( doc => {
            return {...doc.data(), id:doc.id}
          })

          setRestaurants(restaurants);
        })
        .catch(error => console.log(error))
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element = {
            <div className = "restaurantForm">
              <RestaurantForm ownerId = {"WeQX8Ve7BHb3dnU3Lud8"}  />  
              <NavLink to={"/restaurants"}> 
                <button 
                  className="btn btn-secondary" 
                  id='restaurantsButton'
                > 
                  Ver restaurantes 
                </button>  
              </NavLink>
            </div>
          } />
          <Route path='/restaurants' element = {<Restaurants userId = {"WeQX8Ve7BHb3dnU3Lud8"} />} />
          {restaurants.map (restaurant => {
            return (
              <Route path='/restaurants/:id' element = {<Restaurant />} />                  
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

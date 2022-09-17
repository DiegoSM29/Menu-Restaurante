import React, { useState, useEffect } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import db from "../Firebase/firebaseConfig";
import Restaurant from "./restaurant";
import { NavLink } from "react-router-dom";

const Restaurants = (props) => {

  const [restaurants, setRestaurants] = useState([]) 

  useEffect ( () => {    
    const consulta = query(collection(db,"restaurants"), where("ownerId", "==", props.userId));

      getDocs(consulta)
        .then(items => {
          const restaurants = items.docs.map( doc => {
            return {...doc.data(), id:doc.id}
          })

          setRestaurants(restaurants);
        })
        .catch(error => console.log(error))
  },[])

  return(
    <div>
      <h1> Mis restaurantes </h1>
      {restaurants.map(restaurant => {
        return (
          <p> <NavLink to={`/restaurants/${restaurant.id}`}> {restaurant.name} </NavLink> </p> 
        )
      })}
    </div>
  )
}

export default Restaurants;
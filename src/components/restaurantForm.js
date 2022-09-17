import React from 'react';
import '../styles/restaurantForm.css'; 
import { Formik } from 'formik';
import { useState } from 'react';
import {collection, addDoc} from 'firebase/firestore'
import db from '../Firebase/firebaseConfig'
import { Link, NavLink } from 'react-router-dom';

const RestaurantForm = (props) => {
  const [formSent, setFormSent] = useState(false);
  return (
    <>
      <Formik

        onSubmit={(valores, {resetForm}) => {
          resetForm();
          setFormSent(true);
          setTimeout(() => {
            setFormSent(false);
          }, 2000)

          const doc = collection(db, 'restaurants');

          addDoc(doc, {...valores, ownerId: props.ownerId})
            .then (x => console.log(x))
        }}

        initialValues={{
          name:"",
          description:"",
          phone:"",
          cellphone:"",
          addres:""
        }}

        validate = {(valores) => {
          let errors = {};

          if (!valores.name){
            errors.name = "Introduce un nombre";
          }
          if (!valores.description){
            errors.description = "Introduce la descripción";
          }
          if (!valores.phone){
            errors.phone = "Introduce un numero de teléfono";
          }
          if (!valores.cellphone){
            errors.cellphone = "Introduce un número de celular";
          }
          if (!valores.addres){
            errors.addres = "Introduce la dirección";
          }
          
          return errors;
        }}
      >

        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Nombre</label>
              <input 
                type="text" 
                id='name' 
                name='name' 
                value = {values.name}
                onChange = {handleChange}
                onBlur = {handleBlur}
              />
            </div>
            {touched.name && errors.name && <div className='error'> {errors.name} </div>}

            <div>
              <label htmlFor='description'>Descripción</label>
              <input 
                type="text" 
                id='description' 
                name='description' 
                value = {values.description}
                onChange = {handleChange}
                onBlur = {handleBlur}
              />
            </div>
            {touched.description && errors.description && <div className='error'> {errors.description} </div>}

            <div>
              <label htmlFor='phone'>Teléfono</label>
              <input 
                type="text" 
                id='phone' 
                name='phone' 
                value = {values.phone}
                onChange = {handleChange}
                onBlur = {handleBlur}
              />
            </div>
            {touched.phone && errors.phone && <div className='error'> {errors.phone} </div>}

            <div>
              <label htmlFor='cellphone'>Teléfono celular</label>
              <input 
                type='text' 
                id='cellphone' 
                name='cellphone' 
                value = {values.cellphone}
                onChange = {handleChange}
                onBlur = {handleBlur}
              />
            </div>
            {touched.cellphone && errors.cellphone && <div className='error'> {errors.cellphone} </div>}

            <div>
              <label htmlFor='addres'> Dirección </label>
              <input 
                type="text" 
                id='addres' 
                name='addres' 
                value = {values.addres}
                onChange = {handleChange}
                onBlur = {handleBlur}
              />
            </div>

            {touched.addres && errors.addres && <div className='error'> {errors.addres} </div>}

            <button type='submit'className='btn btn-success'> Crear restaurante </button>

            {formSent && <p className='formSent'> Restaurante creado </p>}
          </form>
        )}
          
        
      </Formik>
    </>
  )
}

export default RestaurantForm;
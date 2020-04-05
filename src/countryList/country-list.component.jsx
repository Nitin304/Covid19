import React from 'react';
import {Country} from '../country/country.component';
import './country-list.css';

export const CountryList=(props) =>{
    return(        
        <div className="card-list">
        {
          props.countries.map(country=>{
              return <Country key={country.country} country={country}></Country>
           })
        }
      </div>        
    )
}
import './App.css';
import React, {Component} from 'react';
import {CountryList} from './countryList/country-list.component';
import {Search} from './search/search.component';

class App extends Component{
  constructor(){
    super();
    this.state={
      countries:[],
      searchText:''
    }
  }
  componentDidMount(){
    fetch('https://pomber.github.io/covid19/timeseries.json').
    then(resp=>resp.json()).
    then(data=>this.setState({countries:this.formatData(data)}));
  }
  formatData(data){
    let returnData =[];
    for(let key in data){
      let newObj = {country:key,value:data[key],lastReported:this.getMaxCount(data[key])};
      returnData.push(newObj);
    }
    return returnData;
  }
  getMaxCount(data){
    let val = 0;
    val = data[data.length-1];
    return val;
  }
  handleChange=(e)=>{
    this.setState({searchText:e.target.value});
  }
  render(){
    const {countries, searchText} = this.state;
    let filterList=countries.filter(c=>{
      return c.country.toLowerCase().includes(searchText.toLowerCase())
    })
    return (
      <div className="App">
        <h1><img class="logo" src="./assets/images/icon.png"/>Covid-19 Tracker</h1>
        <Search placeholder="Search Country" handleChange={this.handleChange}
       ></Search>       
        <CountryList countries={filterList}></CountryList>
      </div>
    )
  }
}
export default App
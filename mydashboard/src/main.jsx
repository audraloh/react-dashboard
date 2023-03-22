import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import pictureone from './pictureone.jpg'
import picturetwo from './picturetwo.jpg'
import picturethree from './picturethree.jpg'
import picturefour from './picturefour.jpg'
import picturefive from './picturefive.jpg'
import picturesix from './picturesix.jpg'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { render } from 'react-dom'

//import all photos
//create an array, example: const hotolog = [photoone,phototwo,etc.]

//fetching external source 
async function fetchWeatherData(){
  const data = await fetch("https://api.weather.gov/gridpoints/MTR/86,95/forecast")
  return (data.json())
}

class Weather extends React.Component{
  constructor(props){
    super(props)
    this.state = {temp:0, forecast:""}
  }

  componentDidMount() {
    this.updateWeatherData()
    console.log()
    setInterval(fetchWeatherData,500);
  }

  updateWeatherData(){
    fetchWeatherData().then(data=>{
      const todayForecast = data.properties.periods[0]
      this.setState({
        temp: todayForecast.temperature,
        forecast: todayForecast.shortForecast
      })
      console.log(this.state.temp)
    })
  }  
  render (){
    return(
      <div>
        <div className = "temperature">
          <h2>The temperature is {this.state.temp} degrees!</h2>
        </div>
        <div className = "forecast">
          <p> {this.state.forecast} </p>
        </div>
      </div>
    )
  }
  
}


const photolog = [pictureone, picturetwo, picturethree, picturefour, picturefive, picturesix]

//class holding all of my functions
class Dashboard extends React.Component{
  constructor(props){
  super(props)
  this.state = {
    index:0
 }
  }

  nextphoto(){
 
    let newindex=this.state.index +1
    this.setState({index:newindex})
  }

//button to set state that increases index

  render(){
    return(
    <div>
      <Title/>
      <Photos index={this.state.index} />
      <div className = "button">
      <button onClick={() => this.nextphoto()}>click to see next photo!</button>
      </div>
      <Weather/>
    </div>
    )
  }

}

//header/title function

function Title(){
  return(
    <div className = "title">
      <h1>Audra's Dashboard</h1> 
    </div>
  )
}

function Text(){
  return(
 <div className = "text">
    <p>Weather</p> 
    <h2>Photos</h2> 
  </div>  
  )

}
//function diipslaying my photos

function Photos(props){
  return(
    <div className = "photos">
    <img src = {photolog [props.index]} width="350" />
    </div>
    )
}



ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
);




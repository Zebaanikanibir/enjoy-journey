import React from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';
import './TransportDetails.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Button, Card, Container, Form } from 'react-bootstrap';
import image from '../../images/Frame-1.png'
import transportData from '../FakeData/data.json';
import { useParams } from 'react-router';
import Transport from '../Transport/Transport';
const TransportDetails = () => {
  const {id} = useParams()
  const transport = transportData.find(tr=>tr.id === parseInt(id))

console.log(transport)
const handleBlur = () =>{


    console.log('clicked')

}
const handleClick = (e) =>{
    e.preventDefault()
document.getElementById("card").style.display="none";
document.getElementById("card1").style.display="block";

}
    return (
        <div>
  






           <Container className="details">
           <Card id="card" className="card">
              <Card.Body>
                <Form >
                 <Form.Group>
                   <Form.Label>Pick From</Form.Label>
                   <Form.Control onBlur={handleBlur}  name="name" type="text" required/>
                 </Form.Group>
                 <Form.Group>
                   <Form.Label>Pick to</Form.Label>
                   <Form.Control onBlur={handleBlur}  name="name" id="password" type="text" required/>
                 </Form.Group>
                 <Button variant="info" onClick={handleClick}>Search</Button>

                </Form>
              </Card.Body>
            </Card>
            <Card id="card1">
            <Card.Body>
                <Form >
                 <h3 id="FromPlace">Mirpur1</h3>
                 
                <h3 id="ToPlace">Dhanmondi</h3>
                <div className="info">
                  <img src={transport.imgUrl} alt=""/>
                  <p>4</p>
                  <p>$67</p>
                </div>
                <div className="info">
                  <img src={transport.imgUrl} alt=""/>
                  <p>4</p>
                  <p>$67</p>
                </div>
                <div className="info">
                  <img src={transport.imgUrl} alt=""/>
                  <p>4</p>
                  <p>$67</p>
                </div>
                </Form>
              </Card.Body>
            </Card>
           <Card className="card2">
           <GoogleMap></GoogleMap>
           </Card>
    
           </Container>
        </div>
    );
};

export default TransportDetails;

import React, { useEffect, useState } from 'react';

import './Home.css';
import transportData from '../FakeData/data.json';
import { Link } from 'react-router-dom';
import TransportDetails from '../TransportDetails/TransportDetails';
import Transport from '../Transport/Transport';
const Home = () => {

    const [transports, setTransports] = useState([]);

const handleAddTransport = (transport) =>{

    console.log('added', transport)
}

    useEffect(() =>{
    
        setTransports(transportData)
        console.log(transportData)
    
    
    }, [])

   
    return (
        <div className="box">

         <ul className="home">
             {
                 transports.map(transport => <Transport 
                    transport={transport}
                    handleAddTransport={handleAddTransport}
                    ></Transport>)
             }
             
         </ul>

         
        </div>
    );
};

export default Home;
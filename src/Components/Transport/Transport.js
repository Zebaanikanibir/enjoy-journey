import React from 'react';
import { Link } from 'react-router-dom';
import './Transport.css';
const Transport = (props) => {
    const {name, imgUrl, id} = props.transport;
    const handleAddTransport = props.handleAddTransport;
    return (
        <div className="transport">
           <div className="div">
           <img src={imgUrl} alt=""/>
           <Link to={"/"+id} onClick={()=>handleAddTransport(props.transport)}>
            
            <h3>{name}</h3>
            </Link>
           </div>
        </div>
    );
};

export default Transport;
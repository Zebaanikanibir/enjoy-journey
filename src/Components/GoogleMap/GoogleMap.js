import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import './GoogleMap.css';
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter:{
                lat:23.777176,
                lng:90.399452
           
         }
        }
    };
   
    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            console.log('Success', latLng)
            this.setState({address});
            this.setState({mapCenter: latLng});
            
          })
          .catch(error => console.error('Error', error));
      };
   
    render() {
      return (
          <div id="googleMap">
        <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
              
          <Map className="map" google={this.props.google}
           initialCenter={{
               lat:this.state.mapCenter.lat,
               lng:this.state.mapCenter.lng
           }}>
            
          <Marker 
              position={{
                lat:this.state.mapCenter.lat,
               lng:this.state.mapCenter.lng  
              }}     />
   
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
          </div>
        
      )
    }
  }
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyDfJ1BVSNiReC8PLCx5PfR5SgR1rq_xH28'),
   
  })(MapContainer)
import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import DeviceList from './DeviceList';
import AddDevice from './AddDevice';
import config from './config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddDevice: false,
      error: null,
      response: {},
      Device: {}
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddDevice: true });
  }

  onFormSubmit(data) {
    // console.log('device data - form ', data);
    let apiUrl = config['url'];


    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
      'Content-Type': 'application/json'
      }
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddDevice: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  render() {

    let DeviceForm;
    if(this.state.isAddDevice)
      DeviceForm = <AddDevice onFormSubmit={this.onFormSubmit} Device={this.state.Device} />

    return (
      <div className="App">
        <Container>
          <h1>Home Automation</h1>
          {<Button variant="primary" onClick={() => this.onCreate()}>Add Device</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddDevice && <DeviceList editDevice={this.editDevice}/>}
          { DeviceForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;

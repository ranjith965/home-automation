import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import ToggleButton from 'react-toggle-button'
import config from './config.js';

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      devices: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = config['url'];

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            devices: result
          });
          // console.log(this.state.devices[0].status);
        },
        (error) => {
          // console.log(error);
          this.setState({ error });
        }
      )
  }

  deletedevice(deviceId) {
    const { devices } = this.state;

    const apiUrl = config['url'] + deviceId;

    const options = {
      method: 'DELETE'
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            devices: devices.filter(device => device.id !== deviceId)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  changeToggle(value,device){
    // console.log('value is ', value);
    // console.log('device id', device.id);
    const apiUrl = config['url'] + device.id;
    device.status = value;
    // console.log('device is ',device);

    const options = {
      method: 'POST',
      body: JSON.stringify(device),
      headers: {
      'Content-Type': 'application/json'
      }
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          if(result == "OK"){
            for(let i=0;i<this.state.devices.length;i++){
              if(device.id == this.state.devices[i].id){
                // console.log(true);
                this.state.devices[i].status = value;
              }
            }
            this.setState(this.state);
          }
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, devices} = this.state;

    if(error || this.state.devices.length == 0) {
      return (
        <div><h2>Nothing to show</h2></div>
      )
    } else {
      return(
        <div>
          <h2>Device List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.devices.map(device => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td><ToggleButton
                    value={ device.status }
                    onToggle={(value) => {
                      this.changeToggle(!value,device);
                    }} />
                  </td>
                  <td>
                    &nbsp;<Button variant="danger" onClick={() => this.deletedevice(device.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default DeviceList;

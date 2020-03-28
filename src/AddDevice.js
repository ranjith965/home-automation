import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddDevice extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      status:false
    }

    if(props.device){
      this.state = props.device
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('handle change', event.target.name);
    // console.log('event value', event.target.checked);
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('add device staate', this.state);
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

    return(
      <div>
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="name"/>
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddDevice;

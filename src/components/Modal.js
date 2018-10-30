import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap'

export default class Trigger extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }

  handleHide() {
    this.setState({ show: false });
  }
  render() {
    const {show,handleHide,advTremp} = this.props
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={advTremp}
        >
         פרסם טרמפ!
        </Button>

        <Modal
          show={show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              טרמפ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          הטרמפ יפורסם ותוכל לראותו ב"טרמפים שלי"
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleHide}>סגור</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
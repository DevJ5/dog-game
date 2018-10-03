import React, { Component } from 'react';
import { Buttons } from '../components/Buttons';
import { connect } from 'react-redux';

class ButtonsContainer extends Component {
  render() {
    return (
      this.props.answers.length > 0 && (
        <Buttons
          answers={this.props.answers}
          handleClick={this.props.handleClick}
        />
      )
    );
  }
}

const mapStateToProps = ({ answers }) => ({ answers });

export default connect(mapStateToProps)(ButtonsContainer);

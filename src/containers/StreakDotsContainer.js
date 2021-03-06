import React, {Component} from 'react'
import { connect } from "react-redux";
import StreakDots from "../components/StreakDots";

class StreakDotsContainer extends Component {
  render() {
    return <StreakDots streak={this.props.currentStreak} />
  }
}

const mapStateToProps = ({ currentStreak }) => ({ currentStreak });

export default connect(mapStateToProps)(StreakDotsContainer)
import React, { Fragment } from 'react'
import Sorter from '../components/Sorter'
import { connect } from 'react-redux'
import { setSorter } from '../actions/index'

class SorterContainer extends React.Component {
  handleChange = (event, value) => {
    const { dispatch } = this.props
    dispatch(setSorter(value))
  }

  render() {
    const { selectedSorter } = this.props
    return (
      <Fragment>
        <Sorter onChange={this.handleChange} sortBy={selectedSorter} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { selectedSorter } = state
  return { selectedSorter }
}

export default connect(mapStateToProps)(SorterContainer)
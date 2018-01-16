import React from 'react'
import { connect } from 'react-redux'
import SorterUi from './SorterUi'
import { setSorter } from '../actions'

const Sorter = ({ selectedSorter, dispatch }) =>
  <SorterUi onChange={(value) => dispatch(setSorter(value))} sortBy={selectedSorter} />

const mapStateToProps = state => {
  const { selectedSorter } = state
  return { selectedSorter }
}

export default connect(mapStateToProps)(Sorter)
import React, { Fragment } from 'react'
import TabContainer from '../containers/TabContainer'

const categories= [{name:"all"},{name:"redux"},{name:"react"}]
const value = 0
const Sorter = () => (
  <Fragment>
     {value === 0 && <TabContainer children={0} key="allPost" />}
        {categories.map((category, index) => value === index + 1 && <TabContainer children={category.name} key={category.name} />
        )}        
  </Fragment>
)

export default Sorter
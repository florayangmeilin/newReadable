import React from 'react'
import Typography from 'material-ui/Typography'
import Posts from './Posts'

function TabContainer(props) {
  const children = props.children
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      <Posts category={children} />
    </Typography>  
  );
}

export default TabContainer
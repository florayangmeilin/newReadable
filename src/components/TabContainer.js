import React from 'react';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Post from './Post'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children} 
      <Post />     
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default TabContainer;
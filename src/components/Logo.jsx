// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types';

function Logo({width = '100px'}) {
  return (
    <div style={{ width }}>Logo</div>
  )
}

//add by me
Logo.propTypes = {
  width: PropTypes.string
};

export default Logo
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

function Button({
    // eslint-disable-next-line react/prop-types
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
   <button type={`${type}`} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
    {children}
   </button>
  )
}

//add by me
Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
}

export default Button

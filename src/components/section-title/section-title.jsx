import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  title : PropTypes.string,
  icon  : PropTypes.element
}

const defaultProps = {
  title : 'TABLE',
  icon  : <i className="fas fa-table"/>
}

const SectionTitle = ({ title, icon }) => (
  <h5 className='font-weight-bold'>
    <span className='pr-2'>
      { icon }
    </span>
    { title }
  </h5>
)

SectionTitle.propTypes = propTypes
SectionTitle.defaultProps = defaultProps

export default SectionTitle

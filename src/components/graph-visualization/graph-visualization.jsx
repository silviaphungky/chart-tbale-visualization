import React from 'react'
import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'

const propTypes = {
  graphData    : PropTypes.object,
  graphOptions : PropTypes.object,
  graphType    : PropTypes.object,
  setGraphType : PropTypes.func
}

const defaultProps = {
  graphData    : {},
  graphOptions : {},
  graphType    : {},
  setGraphType : () => {}
}

const GraphVisualization = ({
  graphData,
  graphOptions,
  graphType,
  setGraphType
}) => (
  <>
    <div className='graph__type'>
      <div className='font-weight-bolder'>
        Type:
      </div>
      <CustomInput
        id='line-line'
        type='checkbox'
        label='line-line'
        checked={ graphType.line }
        onChange={ () => {
          graphType.line = true
          graphType.bar = false
          graphType.mix = false
          setGraphType({ ...graphType })
        } }
      />
      <CustomInput
        id='bar-bar'
        type='checkbox'
        label='bar-bar'
        checked={ graphType.bar }
        onChange={ () => {
          graphType.line= false
          graphType.bar = true
          graphType.mix = false
          setGraphType({ ...graphType })
        } }
      />
      <CustomInput
        id='line-bar'
        type='checkbox'
        label='line-bar'
        checked={ graphType.mix }
        onChange={ () => {
          graphType.line= false
          graphType.bar= false
          graphType.mix = true
          setGraphType({ ...graphType })
        } }
      />
    </div>
    <div className='graph__canvas mt-4'>
      <Bar
        width={ 2 }
        height={ 2 }
        data={ graphData }
        options={ graphOptions }
      />
    </div>
  </>
)

GraphVisualization.propTypes = propTypes
GraphVisualization.defaultProps = defaultProps

export default GraphVisualization

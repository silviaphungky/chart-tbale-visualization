import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  tableHeaders : PropTypes.array,
  peopleList   : PropTypes.array
}

const defaultProps = {
  tableHeaders : [],
  peopleList   : []
}

const TableVisualization = ({
  tableHeaders,
  peopleList
}) => (
  <div className='table__wrapper'>
    <table className='w-100'>
      <tr>
        {
          tableHeaders.map((tableHeader, id) => (
            <th 
              className='border--blue px-4 text-capitalize text-center'  
              key={ `table-header-${id}` }
            >
              { tableHeader.split('_').join(' ') }
            </th>
          ))
        }
      </tr>
      {
        peopleList.map((person, index) =>(
          <tr key={ `person-${index}` }>
            { tableHeaders.map((header, id) => (
              <td 
                className={ 'border--blue px-3 py-2 text-nowrap' }
                key={ `data${index}-${id}` }
              >
                { person[header] }
              </td>
            )) }
          </tr>
        ))
      }
    </table>
  </div>
)

TableVisualization.propTypes = propTypes
TableVisualization.defaultProps = defaultProps

export default TableVisualization

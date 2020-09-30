import React from 'react'
import PropTypes from 'prop-types'
import { PaginationLink, PaginationItem, Pagination } from 'reactstrap'

const propTypes = {
  pagination    : PropTypes.object,
  setPagination : PropTypes.func
}

const defaultProps = {
  pagination    : {},
  setPagination : () => {}
}

const CustomPagination = ({
  pagination,
  setPagination
}) => (
  <Pagination listClassName='justify-content-center'>
    <PaginationItem className={ `d-${pagination.current===1 ? 'none': 'block'}` }>
      <PaginationLink 
        previous 
        onClick={ ()=> {
          pagination.prev = pagination.current-2
          pagination.current = pagination.current-1
          pagination.next = pagination.current
          setPagination({ ...pagination })

        } }
      />
    </PaginationItem>
    {
      pagination.prev
        ? <PaginationItem>
          <PaginationLink
            onClick={ () => {
              pagination.prev = pagination.current - 2
              pagination.current = pagination.current - 1
              pagination.next = pagination.current
              setPagination({ ...pagination })
            } }
          >
            { pagination.current-1 }
          </PaginationLink>
        </PaginationItem>
        : null
    }
    <PaginationItem active>
      <PaginationLink
        onClick={ () => {
          pagination.prev = pagination.current - 1
          pagination.next = pagination.current + 1
          setPagination({ ...pagination })
        } }
      >
        { pagination.current }
      </PaginationLink>
    </PaginationItem>
    {
      pagination.next 
        ?     <PaginationItem>
          <PaginationLink
            onClick={ () => {
              pagination.prev = pagination.current 
              pagination.current = pagination.current + 1
              pagination.next = pagination.current + 2
              setPagination({ ...pagination })
            } }
          >
            { pagination.current+1 }
          </PaginationLink>
        </PaginationItem>
        : null
    }
    <PaginationItem>
      <PaginationLink 
        next 
        onClick={ ()=> {
          pagination.prev = pagination.current
          pagination.current = pagination.current+1
          pagination.next = pagination.current+2
          setPagination({ ...pagination })
        } }
        className={ `d-${pagination.next === null ? 'none': 'block'}` }
      />
    </PaginationItem>
  </Pagination>
)

CustomPagination.propTypes = propTypes
CustomPagination.defaultProps = defaultProps

export default CustomPagination

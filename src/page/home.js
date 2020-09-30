import React, { useState, useEffect } from 'react'
import PeopleApi from '../service/people-api'
import { Row, Col, Card, CardBody, Spinner } from 'reactstrap'
import TableVisualization from '../components/table-visualization'
import GraphVisualization from '../components/graph-visualization'
import CustomPagination from '../components/custom-pagination'
import tableHeaders from '../constant/table-headers'
import ExtractQuery from '../utils/extract-query'
import Header from '../components/header'
import Footer from '../components/footer'
import SectionTitle from '../components/section-title'

const Home = () => {

  const [peopleList, setPeopleList] = useState([])
  const [pagination, setPagination] = useState({
    prev    : null,
    current : 1,
    next    : 2
  })
  const [graphType, setGraphType] = useState({
    line : true,
    bar  : false,
    mix  : false
  })
  const [loader, setLoader] = useState(<Spinner color='primary' />)
 

  useEffect(()=> {

    //check local
    const localData = localStorage.getItem(`list-page-${pagination.current}`)
    if(localData) {
      const parseLocalData = JSON.parse(localData)
      const results = parseLocalData.results
      const nextPage = ExtractQuery.getPage(parseLocalData.next)
      const prevPage = ExtractQuery.getPage(parseLocalData.previous)
      pagination.next = nextPage
      pagination.prev = prevPage
      setPeopleList(results)
      setLoader(null)
    }
    //fetch api if local doesn't exist
    else {
      PeopleApi.get(pagination.current)
        .then((response) => {
          const results = response.results
          const nextUrl = response.next
          const prevUrl = response.previous
          const nextPage = ExtractQuery.getPage(nextUrl)
          const prevPage = ExtractQuery.getPage(prevUrl)
          pagination.next = nextPage
          pagination.prev = prevPage
          setPeopleList(results)

          localStorage.setItem(`list-page-${pagination.current}`, JSON.stringify(response))

          setLoader(null)
        })
        .catch((error)=> {
          alert(error.message)
        })
    }

    setPagination({ ...pagination })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current])


  const nameX = peopleList.map((person)=> (person.name))

  const massY = peopleList.map((person) => (person.mass))

  const heightY = peopleList.map((person) => (person.height))

  const determineGraphType = () => {
    let type1
    let type2

    if(graphType.line) {
      type1 = 'line'
      type2 = 'line'
    }
    else if(graphType.bar) {
      type1 = 'bar'
      type2 = 'bar'
    }
    else {
      type1 = 'line'
      type2 = 'bar'
    }
    return{ type1, type2 }
  }

  const graphData = {
    datasets: [
      {
        type                      : determineGraphType().type1,
        label                     : 'mass',
        data                      : massY,
        fill                      : false,
        borderColor               : '#A8B1C4',
        backgroundColor           : '#A8B1C4',
        pointBorderColor          : '#A8B1C4',
        pointBackgroundColor      : '#A8B1C4',
        pointHoverBackgroundColor : '#A8B1C4',
        pointHoverBorderColor     : '#A8B1C4',
        yAxisID                   : 'y-axis-2'
      },
      {
        type                 : determineGraphType().type2,
        label                : 'height',
        data                 : heightY,
        fill                 : false,
        backgroundColor      : '#599BDD',
        borderColor          : '#599BDD',
        hoverBackgroundColor : '#599BDD',
        hoverBorderColor     : '#599BDD',
        yAxisID              : 'y-axis-1'
      }
    ]
  }
  
  const graphOptions = {
    responsive : true,
    labels     : nameX,
    tooltips   : {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    title: {
      display : true,
      text    : 'Graph of People Height and Mass'
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display     : true,
          labelString : 'NAME'
        },
        gridLines: {
          display: false
        },
        labels: nameX
      }],
      yAxes: [{
        type      : 'linear',
        display   : true,
        position  : 'left',
        id        : 'y-axis-1',
        gridLines : {
          display: false
        },
        labels: {
          show: true
        },
        scaleLabel: {
          display     : true,
          labelString : 'HEIGHT'
        }
      }, {
        type      : 'linear',
        display   : true,
        position  : 'right',
        id        : 'y-axis-2',
        gridLines : {
          display: true
        },
        labels: {
          show: true
        },
        scaleLabel: {
          display     : true,
          labelString : 'MASS'
        }
      }]
    }
  }
  
  return(
    <>
      <Header/>
      <Card className='home__card border-0'>
        <CardBody>
          <Row className='home__row-wrapper'>

            <Col sm='12' lg={{ size: 6 }}>
              <SectionTitle 
                title='TABLE' 
                icon={ <i className="fas fa-table"/> }
              />

              <Card className='border shadow py-4'>
                <CardBody>
                  <div className='text-center'>
                    { loader }
                  </div>

                  <TableVisualization 
                    tableHeaders={ tableHeaders }
                    peopleList={ peopleList }
                  />

                  <div className='mt-4'>
                    <CustomPagination
                      pagination={ pagination }
                      setPagination={ setPagination }
                    /> 
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col 
              sm='12' lg={{ size: 5, offset: 1 }}
              className='graph__col'
            >
              <SectionTitle
                title='GRAPH'
                icon={ <i className="fas fa-chart-bar"/> }
              />

              <Card className='border shadow'>
                <div className='mt-2 pt-4'>
                  <GraphVisualization
                    graphData={ graphData }
                    graphOptions={ graphOptions }
                    graphType={ graphType }
                    setGraphType={ setGraphType }
                  />
                </div>

                <div className='my-4'>
                  <CustomPagination
                    pagination={ pagination }
                    setPagination={ setPagination }
                  /> 
                </div>
              </Card> 
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Footer/>
    </>
  )
}

export default Home

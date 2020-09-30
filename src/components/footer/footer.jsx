import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const Footer = () => (
  <div className='header'>
    <Container className='text-center'>
      <Row noGutters className='py-2'>
        <Col>
          <a href='https://github.com/silviaphungky' className='font-weight-bold'>
            <span className='pr-2'>
              <i className="fab fa-github"/>
            </span>
            <span>
              silviaphungky
            </span>
          </a>
        </Col>
        <Col>
          <a href='https://www.linkedin.com/in/silvia-phungky/' className='font-weight-bold'>
            <span className='pr-2'>
              <i className="fab fa-linkedin"/>
            </span>
            <span>
              Silvia Phungky
            </span>
          </a>
        </Col>
      </Row>
    </Container>
  </div>
)

export default Footer

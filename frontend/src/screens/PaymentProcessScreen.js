import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';

export default function PaymentProcessScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  });
  return (
    <div>
      <Helmet>
        <title>Secure Payment</title>
      </Helmet>
      <Row>
        <Col>
          <h1 className="my-3"> Processing Payment </h1>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          <LoadingBox></LoadingBox>
        </Col>
      </Row>
    </div>
  );
}

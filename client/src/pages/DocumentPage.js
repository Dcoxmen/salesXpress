
import Page from 'components/Page';
import { bgCards, gradientCards } from 'demos/docPage';
import React from 'react';

import {
  Button,
  Card,
  CardBody,

  CardText,
  CardTitle,
  Col,

  Row,
} from 'reactstrap';

const DocPage = () => {
  return (
    <Page title="Documents" breadcrumbs={[{ name: 'cards', active: true }]}>
      

      <Row>
        {bgCards.map(({ color }, index) => (
          <Col key={index} lg={4} md={4} sm={6} xs={12} className="mb-3">
            <Card inverse color={color}>
            
            <CardBody>
                <CardTitle className="text-capitalize">
                  {color} card title
                </CardTitle>
              

                <CardBody className="d-flex justify-content-between align-items-center">
                <CardText>Karl David</CardText>
                <Button outline color="light">
                  Click
                </Button>
                </CardBody>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {gradientCards.map(({ color }, index) => (
          <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card
              inverse
              className={`bg-gradient-${color} text-center`}
              style={{ height: 200 }}
            >
              <CardBody className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                <CardTitle>Gradient {color} title</CardTitle>
                <CardText>card text</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Page>
  );
};

export default DocPage;

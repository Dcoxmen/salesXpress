import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import {productsData} from 'demos/dashboardPage';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';

import React from 'react';

import {

  Card,
  CardBody,
  CardImg,
  CardHeader,

  CardText,
  CardTitle,
  Col,

  Row,
} from 'reactstrap';

const CardPage = () => {
  return (
    <Page title="Videos" breadcrumbs={[{ name: 'videos', active: true }]}>
      
      <Row>
        <Col md={6} sm={6} xs={12}>
          <Card>
            <CardImg top src={bg11Image} />
            <CardBody>
              <CardTitle>Card with image</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} sm={6} xs={12} className="mb-3">
          <Card>
            <CardImg top src={bg18Image} />
            <CardBody>
              <CardTitle>Card with list group</CardTitle>
              <CardText>
                This example shows how to use card with list group{' '}
              </CardText>
            </CardBody>

          </Card>
        </Col>
      </Row>

      <Row>
      <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Video Library</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>
      </Row>

      
    </Page>
  );
};

export default CardPage;

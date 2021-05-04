import bg1Image from 'assets/img/bg/background_640-1.jpg';
import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { HorizontalBar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
  MdHeadset
} from 'react-icons/md';
import {
  FaTools,
  FaFile
}from 'react-icons/fa'
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardImg,
  CardTitle,
  CardText,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Margin"
              subtitle="This week"
              number="$34,566"
              color="primary"
              progress={{
                value: 26,
                label: 'Last week',
              }}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="YTD Margin"
              subtitle="This week"
              number="$235,510"
              color="primary"
              progress={{
                value: 25,
                label: 'Last week',
              }}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Activations"
              subtitle="This week"
              number="0"
              color="primary"
              progress={{
                value: 0,
                label: 'Last week',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Revenue{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>LOB Margin Current Week</CardHeader>
              <CardBody>
                <HorizontalBar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>

            </Card>
          </Col>
        </Row>

        <CardGroup style={{ marginBottom: '1rem' }}>
        <Card className="flex-row">
        <Link to="documents">
        <IconWidget
            bgColor="white"
            inverse={false}
            icon={FaFile}
          /></Link>
            <CardBody>
              <CardTitle>Document Library</CardTitle>
              <CardText>
                Get all the paperwork you need for the job.
              </CardText>
            </CardBody>
          </Card>

          <Card className="flex-row">
          <Link to="appinvoice">  
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={FaTools}
          />
          </Link>
            <CardBody>
              <CardTitle>My App Toolbox</CardTitle>
              <CardText>
                A collection of applications to help you succeed.
              </CardText>
            </CardBody>
          </Card>
          <Card className="flex-row">
          <Link to="appinvoice">  
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdHeadset}
          />
          </Link>
            <CardBody>
              <CardTitle>Support Help</CardTitle>
              <CardText>
                FAQ's and answers to the questions you have been wondering about.
              </CardText>
            </CardBody>
          </Card>
        </CardGroup>

        <Row>
          <Col md="6" sm="12" xs="12">
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

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Stack Rank Leaders</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'rank',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>

          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                SalesXpress Locations
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>
        </Row>



        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-primary"
              header="Announcement"
              avatarSize={160}
              name="Latest from HR"
              date="1 hour ago"
              text="This can be an area to communicate daily or weekly topics of focus"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;

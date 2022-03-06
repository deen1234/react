// import { PlusSquareFilled } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import { Hotel } from 'app/modules/Config/ducks/types';
import React, { ReactElement, useState } from 'react';
import './style.less';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface DetailImagesWrapperProps {
  hotelDetails?: Hotel;
}
const DetailImagesWrapper = ({ hotelDetails }: DetailImagesWrapperProps): ReactElement => {
  const [visible, setVisible] = useState(false);

  return (
    <Row gutter={[16, 16]} className="detail-img-wrapper-container">
      <Col md={10} lg={10}>
        <img src={hotelDetails?.feature_image_url} alt="hotel img" className="wrapper-img" />
      </Col>
      <Col xs={0} md={14} lg={14}>
        <Row gutter={[16, 16]}>
          {hotelDetails?.pictures?.map(
            (picture, index) =>
              index <= 3 && (
                <Col md={12} lg={12} key={picture.id}>
                  <img src={picture.image_url} alt="hotel img" className="wrapper-img" />
                </Col>
              ),
          )}
          {hotelDetails?.pictures && hotelDetails?.pictures?.length >= 4 && (
            <a
              className="show-more"
              onClick={() => {
                setVisible(true);
              }}
              role="button"
              tabIndex={0}
            >
              {' '}
              See More
            </a>
          )}

          <Modal
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            centered
            className="modal-container"
            footer={null}
            closable={false}
            width={720}
          >
            <Carousel
              autoPlay
              showIndicators={false}
              centerMode
              centerSlidePercentage={100}
              swipeable
              thumbWidth={75}
              infiniteLoop
            >
              {hotelDetails?.pictures?.map((picture) => (
                <img src={picture.image_url} alt="hotel img" className="wrapper-img " />
              ))}
            </Carousel>
          </Modal>
        </Row>
      </Col>
    </Row>
  );
};

DetailImagesWrapper.defaultProps = {
  hotelDetails: {},
};

export default DetailImagesWrapper;

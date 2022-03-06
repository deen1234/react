import { Breadcrumb } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Breadcumb = (): ReactElement => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Search results</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcumb;

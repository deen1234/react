import { Divider } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import './style.less';

interface HeadingTextProps {
  title: string;
  children: ReactNode;
  isSmall?: boolean;
}

interface HeadingProps {
  isSmall?: boolean;
}

const HeadingText = ({ title, children, isSmall }: HeadingTextProps): ReactElement => {
  return (
    <div className="heading-text-container">
      <HeadingWrapper isSmall={isSmall}>{title}</HeadingWrapper>
      {children}
      {isSmall && <Divider className="divider" />}
    </div>
  );
};

HeadingText.defaultProps = {
  isSmall: false,
};

export default HeadingText;

const HeadingWrapper = styled.h1<HeadingProps>`
  font-size: ${(props) => (props.isSmall ? '1rem' : '1.25rem')};
  color: ${(props) => (props.isSmall ? '#707070' : '#707070')};
  font-weight: bold;
  padding-bottom: 0.25rem;
`;

import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface InlineTextProps {
  primaryText: string;
  secondaryText?: string;
  secondarySubText?: string;
  isMedium?: boolean;
}

interface InlineTextWrapperProps {
  isMedium?: boolean;
}

const InlineText = ({
  primaryText,
  secondaryText,
  isMedium,
  secondarySubText,
}: InlineTextProps): ReactElement => {
  return (
    <InlineTextWrapper isMedium={isMedium}>
      <PrimaryTextWrapper isMedium={isMedium}>{primaryText}</PrimaryTextWrapper>
      <SecondaryTextWrapper isMedium={isMedium}>
        {secondaryText}
        <br />
        {secondarySubText}
      </SecondaryTextWrapper>
    </InlineTextWrapper>
  );
};

InlineText.defaultProps = {
  isMedium: true,
  secondarySubText: '',
  secondaryText: '',
};

export default InlineText;

const InlineTextWrapper = styled.div<InlineTextWrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.isMedium ? 'column' : 'row')};
  align-items: ${(props) => (props.isMedium ? 'center' : 'baseline')};
`;
const PrimaryTextWrapper = styled.div<InlineTextWrapperProps>`
  color: #707070;
  font-family: 'Montserrat', sans-serif;
  font-weight: ${(props) => (props.isMedium ? 500 : 600)};
  font-size: 1rem;
  text-align: ${(props) => (props.isMedium ? 'center' : 'start')};
  min-width: ${(props) => (props.isMedium ? 'auto' : '6.5rem')};
`;
const SecondaryTextWrapper = styled.div<InlineTextWrapperProps>`
  color: #000000;
  font-family: 'Montserrat', sans-serif;
  font-size: ${(props) => (props.isMedium ? '0.9rem' : '1rem')};
  font-weight: ${(props) => (props.isMedium ? 500 : 600)};
  text-align: center;
  padding-top: ${(props) => (props.isMedium ? '0.25rem' : '0')};
`;

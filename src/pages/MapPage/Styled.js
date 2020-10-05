import styled from 'styled-components';

export const StyledPage = styled.div`
  position: relative;
  margin-top: 64px;
`;

export const StyledMap = styled.div`
  min-height: calc(100vh - 64px);
`;

export const StyledPanel = styled.div`
  z-index: 10;
  position: absolute;
  top: 40px;
  left: 24px;
  width: 100%;
  max-width: 500px;
`;

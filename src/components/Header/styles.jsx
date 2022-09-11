import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  height: 60px;
  background: #000;
  margin-top: 20px;
  border-radius: 5px;
  margin-bottom: 3vh;
  box-shadow: 0px 6px 8px -8px cyan;

  @media (min-width: 1025px) {
    width: 1060px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.3rem;
`;

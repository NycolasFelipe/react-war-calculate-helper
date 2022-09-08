import styled from 'styled-components';

export const Footer = styled.div`
  width: 100%;
  background: #000;
  margin-top: 20px;
  border-radius: 5px;
`;

//Header
export const Header = styled.div`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  padding-top: 20px;
  pointer-events: none;
`;

//#region Content
export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 450px;
  padding-top: 20px;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;

  &:hover {
    transform: translateY(5%);
    transition: all 0.2s ease;
  }
`;

export const LinkImage = styled.img`
  width: 40px;
`;

export const LinkText = styled.p`
  font-size: 1.2rem;
  padding-left: 10px;
`;
//#endregion

//Copyright
export const Copyright = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 30px;
  pointer-events: none;
`;

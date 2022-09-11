import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 4px;
  width: 98%;
  overflow: hidden;
  border: 1px solid #424242;
  border-radius: 5px;
  pointer-events: none;
  margin-bottom: 10px;
`;

//#region Header
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 2px 8px;
`;
export const HeaderTitle = styled.p`
  color: #fff;
  font-size: 0.9rem;
`;
//#endregion

//#region Content
export const Content = styled.div`
  display: flex;
  align-items: flex-end;
  height: 160px;
`;

//Section Count
export const SectionCount = styled.div`
  height: 100%;
  width: 30%;
  padding: 5px;
`;
export const SectionCountHeader = styled.div`
  color: #fff;
  text-align: center;
  height: 20%;
  font-size: 0.8rem;

  @media (max-width: 580px) {
    font-size: 0.6rem;
  }
`;
export const SectionCountContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  height: 80%;
  font-size: 1.6rem;
  border: 1px solid #424242;
  border-radius: 5px;

  & > span {
    color: #228be6;
    padding-left: 5px;
  }

  @media (max-width: 580px) {
    font-size: 1rem;
  }
`;
//

//Section Plus
export const SectionPlus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  height: 80%;
  color: #fff;
  font-size: 2rem;

  @media (max-width: 580px) {
    font-size: 1rem;
  }
`;
//

//Section Totality
export const SectionTotality = styled.div`
  width: 45%;
  height: 100%;
  padding: 5px;
`;
export const SectionTotalityHeader = styled.div`
  color: #fff;
  text-align: center;
  height: 20%;
  font-size: 0.8rem;

  @media (max-width: 580px) {
    font-size: 0.6rem;
  }
`;
export const SectionTotalityContent = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  border: 1px solid #424242;
  border-radius: 5px;
`;
//

//Section Totality - Content
export const TotalityContentInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  width: 60%;
  color: #fff;
  font-size: 0.8rem;

  @media (max-width: 580px) {
    font-size: 0.5rem;
  }
`;
export const TotalityContentSummation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  color: #fff;
  font-size: 0.6rem;
`;
export const TotalityContentResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30%;
  color: #228be6;
  font-size: 1.6rem;

  @media (max-width: 580px) {
    font-size: 1rem;
  }
`;
export const NoTotality = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #aaa;
`;
//

//Section Equal
export const SectionEqual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  height: 80%;
  color: #fff;
  font-size: 2rem;

  @media (max-width: 580px) {
    font-size: 1rem;
  }
`;

//Section Result
export const SectionResult = styled.div`
  width: 15%;
  height: 100%;
  padding: 5px;
`;
export const SectionResultHeader = styled.div`
  width: 100%;
  height: 20%;
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
`;
export const SectionResultValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2e8b2e;
  font-size: 2rem;
  font-weight: bold;
  height: 80%;

  @media (max-width: 580px) {
    font-size: 1rem;
  }
`;
//#endregion

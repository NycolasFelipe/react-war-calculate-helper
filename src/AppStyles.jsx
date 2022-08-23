import styled from "styled-components";
import worldMap from "../src/images/world-map.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 600px;
  background-image: url(${worldMap});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
  margin-top: 5vh;
  position: relative;
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 90%;
  height: 70%;
  margin: 0 auto;
`;

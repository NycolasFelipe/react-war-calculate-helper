import styled from "styled-components";

export const Select = styled.select`
  color: #fff;
  font-size: 0.9rem;
  font-weight: lighter;
  width: 100%;
  background: #313131;
  border-radius: 5px;
  border: none;
  padding-left: 2px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #424242;
  }
`;

export const Label = styled.label`
  color: #ccc;
  width: 100%;
  font-size: 0.8rem;
  line-height: 1.5;
`;

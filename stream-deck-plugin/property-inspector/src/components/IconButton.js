import styled from "styled-components";
import {transparentize} from "polished";

export const IconButton = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-image: url(${p => p.icon});
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
  border: 2px solid ${p => !p.selected ? 'rgba(255, 255, 255, .3)' : p.color};
  background-color: ${p => !p.selected ? 'transparent' : transparentize(0.6, p.color)};
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: ${p => transparentize(0.6, p.color)};
  }
`;

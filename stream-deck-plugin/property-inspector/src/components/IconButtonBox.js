import styled from "styled-components";

export const IconButtonBox = styled.div`
  padding: 6px 4px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  color: ${p => !p.selected ? 'rgba(255, 255, 255, .5)' : p.color || '#fff'};

  & > span {
    padding-top: 4px;
  }
`

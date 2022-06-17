import styled from "styled-components";

export const SettingsButtons = styled.div`
  padding: 4px;
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-evenly;
  opacity: ${p => p.opacity ? 0.5 : 1};
  flex-wrap: wrap;

  &:hover {
    opacity: 1;
  }
  
  & button {
    margin: 8px 0;
    outline: 1px solid rgba(255, 255, 255, .1);
    outline-offset: 2px;
    border: 1px solid rgba(255, 255, 255, .5);
    color: rgba(255, 255, 255, .7);
    background: none;
    padding: 4px 8px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      outline-color: rgba(255, 255, 255, .3);
      background: rgba(255, 255, 255, .1);
    }
  }
`

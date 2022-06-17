import styled from "styled-components";

const ButtonsGroupContainer = styled.div`
  display: flex;
  margin-top: 8px;
  border-top: 2px solid rgba(255, 255, 255, .2);
  border-left: none;
  border-right: none;
  flex-wrap: wrap;
`

const Button = styled.button`
  flex: 1;
  justify-content: center;
  display: flex;
  outline: none;
  border: none;
  border-bottom: 2px solid;
  border-bottom-color: ${p => p.selected ? "#f6882d" : "rgba(255, 255, 255, .2)"};
  padding: 4px 2px;
  background: none;
  color: ${p => p.selected ? "#f6882d" : "rgba(255, 255, 255, .5)"};
  cursor: pointer;
`

export const ButtonsGroup = ({items, value, onChange}) => {

    const buttons = items.map(it => <Button
        onClick={() => onChange(it.toLowerCase())}
        selected={value === it.toLowerCase()}>
        {it}
    </Button>);

    return <ButtonsGroupContainer>
        {buttons}
    </ButtonsGroupContainer>

}

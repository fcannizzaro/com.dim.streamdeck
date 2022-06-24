import styled from 'styled-components';

const GestureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid rgba(0, 0, 0, 0.4);
  margin-top: 8px;
  margin-bottom: 8px;
  &:first-of-type {
    margin-top: 10px;
  }
  width: calc(100% - 20px);
  background: rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;

  & span:nth-child(1) {
    display: inline-flex;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    padding: 4px 8px;
    font-weight: bold;
    text-transform: uppercase;
  }

  & span:nth-child(2) {
    margin-top: 8px;
    opacity: 0.6;
    padding: 0 8px;
    color: white;
  }
`;

export const Gesture = ({ gesture, action }) => {
  return (
    <GestureBox>
      <span>{gesture}</span>
      <span>{action}</span>
    </GestureBox>
  );
};

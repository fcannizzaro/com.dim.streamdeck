import styled from 'styled-components';

const AuthorizationBox = styled.div`
  width: calc(100vw - 50px);
  height: 100vh;
  margin-left: 16px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 16px;
  background: radial-gradient(circle at 50% 10%, #34344f 0%, #1a1a2c 100%) fixed;
  border-radius: 4px;

  & > div {
    flex: 1;
    font-size: 28px;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin: 0 16px;
    padding: 16px 8px;
    transition: all 0.3s;
    background: #050f12;
    cursor: pointer;
    border-top: 3px solid #2f96b4;

    &:hover {
      color: white;
      transform: scale(1.1);
    }
  }
`;

export function SetupModal({ challenges, onSave }) {
  return (
    <AuthorizationBox>
      {challenges.map((challenge) => (
        <div key={challenge} onClick={() => onSave(challenge)}>
          {challenge.label}
        </div>
      ))}
    </AuthorizationBox>
  );
}

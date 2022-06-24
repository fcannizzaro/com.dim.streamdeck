import styled from 'styled-components';

export const SettingsHeader = styled.div`
  display: flex;
  padding: 9px 16px;
  width: calc(100% - 32px);
  background: #3d3d3d;
  color: white;
  color: rgba(255, 255, 255, 0.7);
  flex-direction: column;
  border-bottom: ${(p) => (p.error ? '2px solid #FF3333' : 'none')};

  & div:first-of-type {
    font-weight: bold;
    text-transform: uppercase;
  }

  & div:last-of-type {
    margin-top: 4px;
    opacity: 0.7;
  }
`;

export const SettingBody = styled.span`
  color: white;
  padding: 12px 16px 2px;
  justify-content: space-between;
`;

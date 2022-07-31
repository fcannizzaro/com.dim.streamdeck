import styled from 'styled-components';

const DonateBox = styled.div`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  display: flex;
  background: radial-gradient(circle at 50% 10%, #34344f 0%, #1a1a2c 100%) fixed;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export function DonatePage() {
  return (
    <DonateBox>
      <iframe
        width={352}
        height={466}
        allowTransparency={true}
        frameBorder={0}
        scrolling={'no'}
        src='https://ponsor.vercel.app/widget/panel/cl694iy4000060gl6c3636h2w'
        title='donate'
      />
    </DonateBox>
  );
}

import {SettingsBox} from "./SettingsBox";
import {SettingBody, SettingsHeader} from "./SettingsHeader";
import {InfoBanner} from "./DiscordBanner";
import styled from "styled-components";

const BigChallenge = styled.div`
  font-size: 36px;
  color: white;
  justify-content: center;
  display: flex;
  align-items: center;
`

export const ChallengeBox = ({challenge}) => {

    return <SettingsBox error>
        <SettingsHeader error>
            <span>Allow connection on DIM</span>
        </SettingsHeader>
        <SettingBody>
            <BigChallenge>
                {challenge}
            </BigChallenge>
        </SettingBody>
        <InfoBanner/>
    </SettingsBox>
}

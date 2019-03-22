import styled from "styled-components";
import {useEffect, useState} from "react";
import SectionTabSwitcher from "../components/user-profile-components/SectionTabSwitcher";
import EditProfileSection from "../components/user-profile-components/EditProfileSection";
import SettingsSection from "../components/user-profile-components/SettingsSection";
import {
  sectionsData,
  SETTINGS_SECTION_NAME,
  USER_PROFILE_NAME,
} from "../pagesData/userProfileData";

const UserProfilePage = () => {
  const [currentSection, setCurrentSection] = useState(sectionsData[0]);
  useEffect(() => {
    //TODO: fetchFriendData
  }, []);
  return (
    <PageWrapper>
      <SectionTabSwitcher
        currentSection={currentSection}
        sections={sectionsData}
        setCurrentSection={setCurrentSection}
      />
      {(() => {
        if (currentSection.getName() === USER_PROFILE_NAME) {
          return <EditProfileSection />;
        } else if (currentSection.getName() === SETTINGS_SECTION_NAME) {
          return <SettingsSection />;
        }
      })()}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  padding: 32px 0 0 0;
`;
export default UserProfilePage;

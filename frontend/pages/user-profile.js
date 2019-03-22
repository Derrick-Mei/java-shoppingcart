import styled from "styled-components";
import SectionTabSwitcher from "../components/user-profile-components/SectionTabSwitcher";
import {useEffect, useState} from "react";
import {
  sectionsData,
  EDIT_SECTION_NAME,
  FRIENDS_SECTION_NAME,
} from "../pagesData/userProfileData";
import EditProfileSection from "../components/user-profile-components/EditProfileSection";
import FriendsSection from "../components/user-profile-components/FriendsSection";
const UserProfilePage = () => {
  const [currentSection, setCurrentSection] = useState(sectionsData[0]);

  return (
    <PageWrapper>
      {(() => {
        if (currentSection.getName() === EDIT_SECTION_NAME) {
          return <EditProfileSection />;
        } else if (currentSection.getName() === FRIENDS_SECTION_NAME) {
          return <FriendsSection />;
        }
      })()}
      <SectionTabSwitcher
        currentSection={currentSection}
        sections={sectionsData}
        setCurrentSection={setCurrentSection}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
`;
export default UserProfilePage;

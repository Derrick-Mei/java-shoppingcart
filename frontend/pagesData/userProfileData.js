import uuidv4 from "uuid/v4";

class Section {
  constructor(name, value) {
    this._name = name;
    this._value = value;
    this._id = uuidv4();
  }
  getName() {
    return this._name;
  }
  getValue() {
    return this._value;
  }
  getID() {
    return this._id;
  }
}
const [USER_PROFILE_NAME, USER_PROFILE_VALUE] = [
  "User Profile",
  "User Profile",
];
const profileSection = new Section(USER_PROFILE_NAME, USER_PROFILE_VALUE);

const [SETTINGS_SECTION_NAME, SETTINGS_SECTION_VALUE] = [
  "Settings",
  "Settings",
];
const settingsSection = new Section(
  SETTINGS_SECTION_NAME,
  SETTINGS_SECTION_VALUE,
);

const [FRIENDS_SECTION_NAME, FRIENDS_SECTION_VALUE] = [
  "Friends",
  "Friends",
];
const friendsSection = new Section(
  FRIENDS_SECTION_NAME,
  FRIENDS_SECTION_VALUE,
);
const sectionsData = [profileSection, settingsSection];

export {sectionsData, USER_PROFILE_NAME, SETTINGS_SECTION_NAME};

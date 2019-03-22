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
const [EDIT_SECTION_NAME, EDIT_SECTION_VALUE] = ["Edit Info", "Edit Info"];
const editSection = new Section(EDIT_SECTION_NAME, EDIT_SECTION_VALUE);

const [FRIENDS_SECTION_NAME, FRIENDS_SECTION_VALUE] = [
  "Friends",
  "Friends",
];
const friendsSection = new Section(
  FRIENDS_SECTION_NAME,
  FRIENDS_SECTION_VALUE,
);

const sectionsData = [editSection, friendsSection];

export {sectionsData, EDIT_SECTION_NAME, FRIENDS_SECTION_NAME};

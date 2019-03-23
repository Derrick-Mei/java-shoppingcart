import {Radio} from "antd";

const SectionSwitcher = ({
  currentSection,
  sections,
  setCurrentSection,
}) => {
  return (
    <Radio.Group
      defaultValue={currentSection.getValue()}
      buttonStyle="solid"
      onChange={e => {
        setCurrentSection(e.target.section);
      }}
    >
      {sections.map(section => {
        return (
          <Radio.Button
            key={section.getID()}
            value={section.getValue()}
            section={section}
          >
            {section.getName()}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};

export default SectionSwitcher;

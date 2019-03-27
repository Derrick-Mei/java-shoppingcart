import {Button, Input} from "antd";
import styled from "styled-components";
import {useState} from "react";

export interface Props {}

const Searcher: React.SFC<Props> = () => {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <SearchWrapper search_active={searchActive}>
      <SearchBox
        placeholder="Enter Search Input"
        search_active={searchActive}
      />
      <SearchBtn
        type="primary"
        shape="circle"
        icon="search"
        onClick={() => {
          if (searchActive === false) {
            setSearchActive(true);
          } else {
            //TODO run query
          }
        }}
      />
    </SearchWrapper>
  );
};
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 46px;
  padding: 1em;
  background: ${(props: {search_active: boolean}) =>
    props.search_active ? "rgba(57,57,57, .8)" : "rgba(57, 57, 57, .2)"};
`;
const SearchBtn = styled(Button)`
  opacity: 1;
`;
const SearchBox = styled(Input)`
  display: ${(props: {search_active: boolean}) =>
    props.search_active ? "flex" : "none"};
  width: 60%;
`;
export default Searcher;

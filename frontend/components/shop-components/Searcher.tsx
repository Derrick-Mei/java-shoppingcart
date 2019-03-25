import {Button, Input} from "antd";
import styled from "styled-components";
import {useState} from "react";

export interface Props {}

const Searcher: React.SFC<Props> = () => {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <SearchWrapper searchActive={searchActive}>
      <SearchBox
        placeholder="Enter Search Input"
        searchActive={searchActive}
      />
      <SearchBtn
        type="primary"
        shape="circle"
        icon="search"
        size="medium"
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
  background: ${props => props.theme.black};
  opacity: ${props => (props.searchActive ? 0.9 : 0.4)};
`;
const SearchBtn = styled(Button)`
  opacity: 1;
`;
const SearchBox = styled(Input)`
  display: ${props => (props.searchActive ? "flex" : "none")};
  width: 60%;
`;
export default Searcher;

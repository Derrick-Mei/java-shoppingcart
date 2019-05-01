import {Button, Input} from "antd";
import styled from "styled-components";
import {useState} from "react";
import {InputEventTarget} from "../../interfaces";
import getCriteriaSearch from "../../lib/requestsEndpoints/getCriteriaSearch";

export interface Props {
  // pageNumber: number;
  setMerchandiseFromSearch: Function;
}

const Searcher: React.SFC<Props> = ({setMerchandiseFromSearch}) => {
  const [searchActive, setSearchActive] = useState("false");
  const [searchText, setSearchText] = useState("");

  const changeSearchTextHandler = (e: InputEventTarget) => {
    setSearchText(e.target.value);
  };
  const runCriteriaSearch = async () => {
    if (searchText) {
      const searchData = await getCriteriaSearch(searchText, 1);
      // console.log(searchData);
      setMerchandiseFromSearch(searchData);
    } else {
      setMerchandiseFromSearch([]);
    }
  };
  return (
    <SearchWrapper search_active={searchActive}>
      <SearchBox
        placeholder="Enter Search Input"
        search_active={searchActive}
        value={searchText}
        onChange={e => {
          changeSearchTextHandler(e);
        }}
        onKeyDown={e => {
          //13 is the enter key
          if (e.keyCode === 13) {
            runCriteriaSearch();
          }
        }}
      />
      <SearchBtn
        type="primary"
        shape="circle"
        icon="search"
        onClick={() => {
          if (searchActive === "false") {
            setSearchActive("true");
          } else {
            runCriteriaSearch();
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
  z-index: 1000;
  padding: 1em;
  background: ${(props: {search_active: string}) =>
    props.search_active === "true"
      ? "rgba(57,57,57, .8)"
      : "rgba(57, 57, 57, .2)"};
`;
const SearchBtn = styled(Button)`
  opacity: 1;
`;
const SearchBox = styled(Input)`
  display: ${(props: {search_active: string}) =>
    props.search_active === "true" ? "flex" : "none"};
  width: 60%;
`;
export default Searcher;

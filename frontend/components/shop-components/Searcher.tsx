import {Button} from "antd";
import styled from "styled-components";

export interface Props {}

const Searcher: React.SFC<Props> = () => {
  return (
    <Button type="primary" shape="circle" icon="search" size="large" />
  );
};
const SearchWrapper = styled.div``;
export default Searcher;

import {Drawer, Button, Card} from "antd";
import styled from "styled-components";
import {useState} from "react";
import ItemCard from "./ItemCard";

interface Order {
  date: string;
  id: string;
  content: string;
}
interface Props {
  isMainVisible: boolean;
  setIsMainVisible: Function;
  mainData: any;
}
const OrderHistoryDrawer: React.SFC<Props> = ({
  isMainVisible,
  setIsMainVisible,
  mainData,
}) => {
  const [isChildVisible, setIsChildVisible] = useState(false);
  return (
    <>
      <MainDrawer
        title={"Your Past Orders"}
        visible={isMainVisible}
        placement={"left"}
        onClose={() => setIsMainVisible(false)}
      >
        <Button type="primary" onClick={() => setIsMainVisible(false)}>
          Back
        </Button>
        <CardsList>
          {mainData.map((order: Order) => {
            <Card key={order.id} title={`Order Date: ${order.date}`}>
              {order.content}
            </Card>;
          })}
        </CardsList>
      </MainDrawer>

      <ChildDrawer title={`Order`} visible={isChildVisible}>
        {/* <ItemCard /> */}
      </ChildDrawer>
    </>
  );
};
const MainDrawer = styled(Drawer)``;
const ChildDrawer = styled(Drawer)``;
const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export default OrderHistoryDrawer;

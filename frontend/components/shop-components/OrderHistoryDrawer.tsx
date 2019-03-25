import {Drawer, Button, Card} from "antd";
import styled from "styled-components";
import {useState} from "react";
import ItemCard from "./ItemCard";

interface Order {
  date: string;
  id: string;
  description: string;
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
        <CardsList
          onClick={() => {
            setIsChildVisible(true);
          }}
        >
          {mainData.map((order: Order) => {
            return (
              <Card key={order.id} title={`Order Date: ${order.date}`}>
                {order.description}
              </Card>
            );
          })}
        </CardsList>
      </MainDrawer>

      <ChildDrawer
        title={`Order`}
        visible={isChildVisible}
        placement={"left"}
        onClose={() => setIsChildVisible(false)}
      >
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

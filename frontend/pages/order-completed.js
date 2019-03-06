import Reward from "react-rewards";
import { Button } from "antd";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";

const OrderCompletedPage = () => {
  let rewardRef = useRef(null);
  useEffect(() => {
    rewardRef.current.rewardMe();
  }, []);
  return (
    <OrderWrapper>
      <Reward ref={ref => (rewardRef.current = ref)} type="confetti">
        <h2>Thanks for your order!</h2>
        <Button
          onClick={() => {
            Router.push({
              pathname: "/shop"
            });
          }}
        >
          Back to shopping
        </Button>
      </Reward>
    </OrderWrapper>
  );
};
const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 30%;
  overflow: hidden;
`;

export default OrderCompletedPage;

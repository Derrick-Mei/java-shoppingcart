import styled from "styled-components";
import React from "react";
export interface Props {
  image: string;
  title: string;
  description: string;
  price?: number;
  actionBtn?: React.ReactElement;
}

const ItemCard: React.SFC<Props> = ({
  image,
  title,
  description,
  price,
  actionBtn,
}) => {
  return (
    <StyledCard>
      <ItemImage src={image} alt="" />
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
        {actionBtn ? (
          <ActionsContainer>
            {React.cloneElement(actionBtn)}
          </ActionsContainer>
        ) : (
          ""
        )}
      </ItemTextContainer>
    </StyledCard>
  );
};
const StyledCard = styled.div`
  display: flex;
  background: ${props => props.theme.white};
  width: 100%;
  padding: 0;
  margin-bottom: 24px;
`;
const ItemTextContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 1.4em;
`;

const ItemTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0;
`;
const ItemDescription = styled.p`
  font-size: 1.2rem;
  margin-top: 0;
  line-height: 1.3;
`;
const ItemImage = styled.img`
  height: 100%;
  width: 35%;
`;
const ActionsContainer = styled.div`
  /* display: flex;
  justify-content: space-around; */
`;
export default ItemCard;

import styled from "styled-components";
import {Image, Transformation} from "cloudinary-react";
import {Button} from "antd";
import uuidv4 from "uuid/v4";
export interface Props {
  imagePublicId: string;
  imageHeight: number;
  imageWidth: number;
  title: string;
  description: string;
  price?: number;
  actionBtns?: [React.ReactElement];
}

const ItemCard: React.SFC<Props> = ({
  imagePublicId,
  imageHeight,
  imageWidth,
  title,
  description,
  price,
  actionBtns,
}) => {
  return (
    <StyledCard>
      <Image publicId={imagePublicId}>
        <Transformation
          crop="fit"
          height={imageHeight}
          width={imageWidth}
        />
      </Image>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
        {actionBtns ? (
          <ActionsContainer>
            {actionBtns.map((btn, i) => {
              return React.cloneElement(btn, {key: uuidv4()});
            })}
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
  max-width: 400px;
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
const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em 0 0;
  & > * {
    margin-bottom: 1em;
  }
`;
export default ItemCard;

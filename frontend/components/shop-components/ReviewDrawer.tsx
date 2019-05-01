import {Comment, Divider, Rate, Button, Drawer} from "antd";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";

interface Review {
  headline: string;
  reviewBody: string;
  stars: number;
  reviewId: number;
  reviewer: {
    userId: number;
    username: string;
  };
}
export interface ReviewDrawerProps {
  isVisible: boolean;
  reviewsData: [Review];
  setVisible: Function;
  productTitle: string;
}

const ReviewDrawer: React.SFC<ReviewDrawerProps> = ({
  isVisible,
  reviewsData,
  setVisible,
  productTitle,
}) => {
  return (
    <Drawer
      title={`Reviews for ${
        productTitle ? productTitle : "this product."
      }`}
      visible={isVisible}
      placement={"left"}
      onClose={() => setVisible(false)}
    >
      <SpacingWrapper>
        <Button type="primary">Submit Review</Button>
        <Rate />
        <TextArea rows={4} />
        {reviewsData.map(review => {
          const {reviewer} = review;
          return (
            <Comment
              key={review.reviewId}
              avatar={""}
              author={reviewer.username}
              content={
                <ContentContainer>
                  <p>{review.reviewBody}</p>
                  <Rate disabled value={review.stars} />
                  <Divider />
                </ContentContainer>
              }
            />
          );
        })}
      </SpacingWrapper>
    </Drawer>
  );
};

const SpacingWrapper = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ReviewDrawer;

import {Comment, Divider, Rate, Button, Drawer} from "antd";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";

interface ReviewComment {
  avatar: string;
  commentText: string;
  rating: number;
  keyId: string;
  author: string;
}
export interface ReviewDrawerProps {
  isVisible: boolean;
  commentsData: [ReviewComment];
}
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const ReviewDrawer: React.SFC<ReviewDrawerProps> = ({
  isVisible,
  commentsData,
}) => {
  return (
    <Drawer visible={isVisible} placement={"right"}>
      <SpacingWrapper>
        <Button type="primary">Submit Review</Button>
        <Rate />
        <TextArea rows={4} />
        {commentsData.map(comment => {
          return (
            <Comment
              key={comment.keyId}
              avatar={comment.avatar}
              author={comment.author}
              content={
                <ContentContainer>
                  <p>{comment.commentText}</p>
                  <Rate disabled value={comment.rating} />
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
    margin-top: 20px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ReviewDrawer;

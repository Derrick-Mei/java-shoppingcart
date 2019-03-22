import {List, Avatar} from "antd";
import {Image, Transformation} from "cloudinary-react";

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

const FriendsSection = () => {
  return (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Image publicId={item.image} />}
            title={<a href="#">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
};

export default FriendsSection;

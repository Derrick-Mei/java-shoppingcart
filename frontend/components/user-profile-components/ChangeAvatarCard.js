import {
  Upload,
  Icon,
  Comment,
  Card,
  Divider,
  Avatar,
  message,
  Button,
} from "antd";
import Context from "../context/Context";
import {useState, useContext} from "react";
import qs from "qs";
import axios from "axios";

// const [isPreviewVisible, setIsPreviewVisible] = useState(false);
// const [previewImage, setPreviewImage] = useState("");

// const checkFileRequirements = file => {
//   const isJPG = file.type === "image/jpeg";
//   const isPNG = file.type === "image/png";
//   if (!isJPG && !isPNG) {
//     message.error("You can only upload JPG or a PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJPG && isLt2M;
// };

const ChangeAvatarCard = ({username}) => {
  const {cloudinaryCore} = useContext(Context);
  const [imagePublicId, setImagePublicId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [currFileIndex, setCurrFileIndex] = useState(0);
  const [fileList, setFileList] = useState([]);

  const fileSelectedHandler = e => {
    setFileList([...fileList, e.target.files[0]]);
  };

  const submitUploadToCloud = () => {
    const cloudUploadLink =
      process.env.CLOUDINARY_BASE_URL + "/image/upload";
    const cloudPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);
    formData.append("upload_preset", cloudPreset);
    formData.append("public_id", `users-avatars/profile-pic-${"id"}`);
    axios({
      url: cloudUploadLink,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        headStyle={{
          display: "flex",
          justifyContent: "center",
        }}
        bodyStyle={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        title="Upload Avatar Picture"
      >
        <input type="file" onChange={fileSelectedHandler} />
        <Button.Group>
          <Button>Undo</Button>
          <Button type="primary" onClick={submitUploadToCloud}>
            Save Avatar
          </Button>
        </Button.Group>
        <Divider />
        <Comment
          avatar={
            <Avatar src={cloudinaryCore.url(imagePublicId)} alt="" />
          }
          author={username}
          alt={username}
          content={
            <p>
              This is a sample review comment, the avatar image on your
              left is a preview.
            </p>
          }
        />
      </Card>
    </>
  );
};

export default ChangeAvatarCard;

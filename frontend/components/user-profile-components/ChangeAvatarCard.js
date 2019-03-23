import {
  Upload,
  Icon,
  Comment,
  Card,
  Divider,
  Avatar,
  notification,
  Button,
  Modal,
  Radio,
} from "antd";
import Context from "../context/Context";
import {useState, useEffect, useContext, useRef} from "react";
import qs from "qs";
import axios from "axios";
import styled from "styled-components";

const ChangeAvatarCard = ({username}) => {
  const {cloudinaryCore} = useContext(Context);
  const [imagePublicId, setImagePublicId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [currFileIndex, setCurrFileIndex] = useState(0);
  const [fileList, setFileList] = useState([]);

  const [readerResults, setReaderResults] = useState([]);
  const [isFilesModalOpen, setFilesModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const uploaderRef = useRef(null);
  useEffect(() => {
    setCurrFileIndex(fileList.length - 1);
  }, [fileList]);

  const checkFileRequirements = file => {
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG && !isPNG) {
      message.error("You can only upload JPG or a PNG file!");
      return false;
    } else if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    } else {
      return true;
    }
  };
  const fileSelectedHandler = e => {
    const file = e.target.files[0];
    let doesFilePass = false;
    if (file) {
      doesFilePass = checkFileRequirements(file);
    }
    if (doesFilePass) {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);

      reader.onloadend = e => {
        setPreviewImage(reader.result);
        const isDuplicateImage = readerResults.some(imgData => {
          return reader.result === imgData;
        });
        if (!isDuplicateImage) {
          setFileList([...fileList, file]);
          setReaderResults([...readerResults, reader.result]);
        }
      };
    }
  };

  const submitUploadToCloud = () => {
    const cloudUploadLink =
      process.env.CLOUDINARY_BASE_URL + "/image/upload";
    const cloudPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", fileList[currFileIndex].originFileObj);
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
        notification.success({
          message: "Avatar Updated!",
          description: "The image has been saved into our database.",
        });
        setImagePublicId(res.data.public_id);
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
        <PreviewImage
          src={previewImage}
          alt="A preview of your uploaded avatar image."
        />
        <input
          type="file"
          ref={ref => (uploaderRef.current = ref)}
          onChange={fileSelectedHandler}
          style={{display: "none"}}
        />
        <Button onClick={() => uploaderRef.current.click()}>
          Upload File
        </Button>
        <Button.Group style={{marginTop: "18px"}}>
          {fileList.length > 0 ? (
            <>
              <Button onClick={() => setFilesModalOpen(true)}>
                Files Uploaded
              </Button>
              <Button type="primary" onClick={submitUploadToCloud}>
                Save Avatar
              </Button>
            </>
          ) : null}
        </Button.Group>
        <Divider />
        <Comment
          avatar={
            <Avatar
              src={
                previewImage
                  ? previewImage
                  : cloudinaryCore.url(imagePublicId)
              }
              alt=""
            />
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
        <Modal
          title="Files uploaded this session"
          visible={isFilesModalOpen}
          onCancel={() => setFilesModalOpen(false)}
          onOk={() => {
            setFilesModalOpen(false);
          }}
        >
          {readerResults.map(imgSrc => {
            return <PreviewImage key={imgSrc} src={imgSrc} />;
          })}
        </Modal>
      </Card>
    </>
  );
};
const PreviewImage = styled.img`
  display: ${props => (props.src === "" ? "none" : "flex")};
  width: 100%;
`;
export default ChangeAvatarCard;

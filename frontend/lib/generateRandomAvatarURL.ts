import {
  generateRandomNumByRange,
  chooseRandomItemInArray,
} from "./randomGeneratorMethods";
import axios from "axios";
const generateRandomAvatarURL = async (): Promise<string> => {
  try {
    const {data} = await axios({
      method: "get",
      url: "https://api.adorable.io/avatars/list",
    });
    const face = data.face;
    const eyes: [string] = face.eyes;
    const noses: [string] = face.nose;
    const mouths: [string] = face.mouth;

    const randomEye = chooseRandomItemInArray(eyes);
    const randomNose = chooseRandomItemInArray(noses);
    const randomMouth = chooseRandomItemInArray(mouths);
    const randomColor = generateRandomNumByRange(0, 999);
    return `https://api.adorable.io/avatars/face/${randomEye}/${randomNose}/${randomMouth}/${randomColor}`;
  } catch (err) {
    console.log(err);
    return "error";
  }
};

export default generateRandomAvatarURL;

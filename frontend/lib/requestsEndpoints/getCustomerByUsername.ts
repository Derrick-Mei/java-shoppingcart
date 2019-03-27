import {createBearerAxios} from "../axiosInstances";

export default async (
  username: string,
  onSuccess: Function,
  onError: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "get",
      url: `/customer/username/${username}`,
    });
    if (onSuccess) {
      onSuccess();
    }
    return data;
  } catch (err) {
    if (onError) {
      onError();
    }
    return {status: "error"};
  }
};

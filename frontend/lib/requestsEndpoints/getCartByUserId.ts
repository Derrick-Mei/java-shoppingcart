import {createBearerAxios} from "../axiosInstances";

export default async (
  userId: number,
  onSuccess: Function,
  onError: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "get",
      url: `/cart/${userId}`,
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

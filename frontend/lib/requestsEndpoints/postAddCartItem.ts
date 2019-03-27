import {createBearerAxios} from "../axiosInstances";

export default async (
  userId: number,
  productId: number,
  onSuccess: Function,
  onError: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "post",
      url: `/cart/addtocart/${userId}/${productId}/1`,
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

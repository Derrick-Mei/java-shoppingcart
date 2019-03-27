import {createBearerAxios} from "../axiosInstances";

export default async (
  userId: number,
  productId: number,
  quantity: number,
  onSuccess: Function,
  onError: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "put",
      url: `/cart/modifyquantityincart/${userId}/${productId}/${quantity}`,
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

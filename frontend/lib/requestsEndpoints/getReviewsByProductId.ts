import {createBaseAxios} from "../axiosInstances";

export default async (
  productId: number,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    const {data} = await createBaseAxios()({
      method: "get",
      url: `/shop/reviews/${productId}`,
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

import {createBaseAxios} from "../axiosInstances";

export default async (
  productId: number,
  page: number,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    const {data} = await createBaseAxios()({
      method: "get",
      url: `/shop/reviews/${productId}/page/${page}`,
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

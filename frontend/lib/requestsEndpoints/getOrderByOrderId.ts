import {createBearerAxios} from "../axiosInstances";

export default async (
  orderId: number,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "get",
      url: `/orders/${orderId}`,
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

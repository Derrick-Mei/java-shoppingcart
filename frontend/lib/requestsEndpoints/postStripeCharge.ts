import {createBearerAxios} from "../axiosInstances";

export default async (
  amount: number,
  email: string,
  id: string,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "post",
      url: "/charge",
      data: {
        amount: amount,
        stripeEmail: email,
        stripeToken: id,
      },
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

import {createBearerAxios} from "../axiosInstances";

interface UserDetails {
  shippingaddress: string;
  paymentdetails: string;
}

export default async (
  userData: UserDetails,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    const {data} = await createBearerAxios()({
      method: "post",
      url: `/cart/buy`,
      data: userData,
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

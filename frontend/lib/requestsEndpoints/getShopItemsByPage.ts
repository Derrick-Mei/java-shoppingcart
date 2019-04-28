import {createBaseAxios} from "../axiosInstances";

export default async (
  page: number,
  onSuccess: Function,
  onError: Function,
) => {
  try {
    const {data} = await createBaseAxios()({
      method: "get",
      url: `/shop/reviewitems/page/${page}/orderby/productId/ascdesc/ascending`,
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

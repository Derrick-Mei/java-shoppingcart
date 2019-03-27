import {createBaseAxios} from "../axiosInstances";

export default async (
  itemName: string,
  pageNumber: number,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    // /shop/criteria/{search string}/page/{page}
    const {data} = await createBaseAxios()({
      method: "get",
      url: `/shop/criteria/${itemName}/page/${pageNumber}`,
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

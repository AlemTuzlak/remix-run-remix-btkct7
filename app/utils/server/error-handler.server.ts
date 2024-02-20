import type { TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

export const errorHandler = async <
  ReturnType extends unknown,
  CustomResponseReturnType extends unknown
>(
  loaderOrActionFn: () => Promise<ReturnType> | ReturnType,
  customResponse?:
    | { config?: ResponseInit; data: CustomResponseReturnType }
    | (() => CustomResponseReturnType | Promise<CustomResponseReturnType>)
) => {
  try {
    // Whenever we have a try and catch block we need to await the execution of a function so if the error is thrown it is caught
    // if we return the below without awaiting if an error is thrown it won't go into the catch boundary
    const res = await loaderOrActionFn();
    return res;
  } catch (err) {
    // If the error is a Response, return it as is (handles both redirects and thrown responses)
    if (err instanceof Response) {
      // There is no way to infer this type so we have to return it as T to get type safety
      return err as ReturnType;
    }

    // If we have a custom response object
    if (typeof customResponse === 'object') {
      return json<CustomResponseReturnType>(
        customResponse.data,
        customResponse.config ?? { status: 400 }
      );
    }
    // If we have a custom function response call and await it
    if (typeof customResponse === 'function') {
      return (await customResponse()) as TypedResponse<CustomResponseReturnType>;
    }
    // Otherwise, throw the error
    throw err;
  }
};

const isMethod = (method: string) => (request: Request) =>
  request.method.toLowerCase() === method;

export const isGet = isMethod('get');

export const isPost = isMethod('post');

export const isDelete = isMethod('delete');

export const isPut = isMethod('put');

export function notFound(message: string) {
  return new Response(message, { status: 404 });
}

function notAllowedMethod(message: string) {
  return new Response(message, { status: 405 });
}

export function assertIsAction(
  request: Request,
  message = 'Method not allowed in loader'
) {
  if (isGet(request)) {
    throw notAllowedMethod(message);
  }
}

const assertIsMethod =
  (isExpectedMethod: (request: Request) => boolean) =>
  (request: Request, message = 'Method not allowed') => {
    if (!isExpectedMethod(request)) {
      throw notAllowedMethod(message);
    }
  };

export const assertIsGet = assertIsMethod(isGet);

export const assertIsPost = assertIsMethod(isPost);

export const assertIsDelete = assertIsMethod(isDelete);

export const assertIsPut = assertIsMethod(isPut);

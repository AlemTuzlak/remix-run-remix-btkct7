import { assertIsPost } from '~/utils/server/http.server';
import { ActionFunctionArgs } from '@remix-run/node';
import { errorHandler } from '~/utils/server/error-handler.server';
import { useFetcher } from '@remix-run/react';
export const action = ({ request }: ActionFunctionArgs) =>
  errorHandler(
    async () => {
      assertIsPost(request);

      return { success: true };
    },
    { data: { success: false } }
  );

export const useSomething = () => {
  const fetcher = useFetcher();
  return fetcher;
};

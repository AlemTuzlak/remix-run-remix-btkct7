import type { MetaFunction } from '@remix-run/node';
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { getAuthSession } from '~/auth/auth.session.server';
import { redirect, json } from '@remix-run/node';
import { assertIsPost } from '~/utils/server/http.server';
import { useSomething } from './resource/assessments/read-all';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authSession = await getAuthSession(request);
  if (authSession) {
    return redirect('/dashboard');
  }

  return json('login', request);
};
export const action = async ({ request }: ActionFunctionArgs) => {
  assertIsPost(request);
};

export default function Index() {
  useSomething();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix hi</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}

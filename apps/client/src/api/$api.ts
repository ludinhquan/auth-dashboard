import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_6y3ekp } from './dashboard/summary';
import type { Methods as Methods_1aa8x5p } from './dashboard/users';
import type { Methods as Methods_1pit7fj } from './email-confirmation/confirm';
import type { Methods as Methods_1cszvff } from './email-confirmation/resend-confirmation-link';
import type { Methods as Methods_10oxnvc } from './google-authentication';
import type { Methods as Methods_idk8rz } from './login';
import type { Methods as Methods_1rpsris } from './logout';
import type { Methods as Methods_1uc1f5c } from './me';
import type { Methods as Methods_1lgtes2 } from './ping';
import type { Methods as Methods_1lokjgx } from './refresh';
import type { Methods as Methods_1pbnd9f } from './register';
import type { Methods as Methods_1i354bd } from './reset-password';
import type { Methods as Methods_tli9od } from './user';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:4000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/dashboard/summary';
  const PATH1 = '/dashboard/users';
  const PATH2 = '/email-confirmation/confirm';
  const PATH3 = '/email-confirmation/resend-confirmation-link';
  const PATH4 = '/google-authentication';
  const PATH5 = '/login';
  const PATH6 = '/logout';
  const PATH7 = '/me';
  const PATH8 = '/ping';
  const PATH9 = '/refresh';
  const PATH10 = '/register';
  const PATH11 = '/reset-password';
  const PATH12 = '/user';
  const GET = 'GET';
  const POST = 'POST';
  const PATCH = 'PATCH';

  return {
    dashboard: {
      summary: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_6y3ekp['get']['resBody'], BasicHeaders, Methods_6y3ekp['get']['status']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_6y3ekp['get']['resBody'], BasicHeaders, Methods_6y3ekp['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      users: {
        get: (option?: { query?: Methods_1aa8x5p['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1aa8x5p['get']['resBody'], BasicHeaders, Methods_1aa8x5p['get']['status']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { query?: Methods_1aa8x5p['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1aa8x5p['get']['resBody'], BasicHeaders, Methods_1aa8x5p['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1aa8x5p['get']['query'] } | undefined) =>
          `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
    email_confirmation: {
      confirm: {
        post: (option: { body: Methods_1pit7fj['post']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1pit7fj['post']['status']>(prefix, PATH2, POST, option).send(),
        $post: (option: { body: Methods_1pit7fj['post']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1pit7fj['post']['status']>(prefix, PATH2, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
      resend_confirmation_link: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1cszvff['post']['resBody'], BasicHeaders, Methods_1cszvff['post']['status']>(prefix, PATH3, POST, option).json(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1cszvff['post']['resBody'], BasicHeaders, Methods_1cszvff['post']['status']>(prefix, PATH3, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
    },
    google_authentication: {
      post: (option: { body: Methods_10oxnvc['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_10oxnvc['post']['status']>(prefix, PATH4, POST, option).send(),
      $post: (option: { body: Methods_10oxnvc['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_10oxnvc['post']['status']>(prefix, PATH4, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    login: {
      post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_idk8rz['post']['status']>(prefix, PATH5, POST, option).send(),
      $post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_idk8rz['post']['status']>(prefix, PATH5, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    logout: {
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['post']['status']>(prefix, PATH6, POST, option).send(),
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['post']['status']>(prefix, PATH6, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    me: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody'], BasicHeaders, Methods_1uc1f5c['get']['status']>(prefix, PATH7, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody'], BasicHeaders, Methods_1uc1f5c['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
    ping: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1lgtes2['get']['status']>(prefix, PATH8, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1lgtes2['get']['status']>(prefix, PATH8, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH8}`,
    },
    refresh: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1lokjgx['get']['status']>(prefix, PATH9, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1lokjgx['get']['status']>(prefix, PATH9, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH9}`,
    },
    register: {
      post: (option: { body: Methods_1pbnd9f['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1pbnd9f['post']['status']>(prefix, PATH10, POST, option).send(),
      $post: (option: { body: Methods_1pbnd9f['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1pbnd9f['post']['status']>(prefix, PATH10, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH10}`,
    },
    reset_password: {
      post: (option: { body: Methods_1i354bd['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1i354bd['post']['status']>(prefix, PATH11, POST, option).send(),
      $post: (option: { body: Methods_1i354bd['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1i354bd['post']['status']>(prefix, PATH11, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH11}`,
    },
    user: {
      patch: (option: { body: Methods_tli9od['patch']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_tli9od['patch']['status']>(prefix, PATH12, PATCH, option).send(),
      $patch: (option: { body: Methods_tli9od['patch']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_tli9od['patch']['status']>(prefix, PATH12, PATCH, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH12}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1pit7fj } from './email-confirmation/confirm';
import type { Methods as Methods_1cszvff } from './email-confirmation/resend-confirmation-link';
import type { Methods as Methods_10oxnvc } from './google-authentication';
import type { Methods as Methods_idk8rz } from './login';
import type { Methods as Methods_1rpsris } from './logout';
import type { Methods as Methods_1uc1f5c } from './me';
import type { Methods as Methods_1lgtes2 } from './ping';
import type { Methods as Methods_1pbnd9f } from './register';
import type { Methods as Methods_1i354bd } from './reset-password';
import type { Methods as Methods_tli9od } from './user';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:4000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/email-confirmation/confirm';
  const PATH1 = '/email-confirmation/resend-confirmation-link';
  const PATH2 = '/google-authentication';
  const PATH3 = '/login';
  const PATH4 = '/logout';
  const PATH5 = '/me';
  const PATH6 = '/ping';
  const PATH7 = '/register';
  const PATH8 = '/reset-password';
  const PATH9 = '/user';
  const GET = 'GET';
  const POST = 'POST';
  const PATCH = 'PATCH';

  return {
    email_confirmation: {
      confirm: {
        post: (option: { body: Methods_1pit7fj['post']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1pit7fj['post']['status']>(prefix, PATH0, POST, option).send(),
        $post: (option: { body: Methods_1pit7fj['post']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1pit7fj['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      resend_confirmation_link: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1cszvff['post']['resBody'], BasicHeaders, Methods_1cszvff['post']['status']>(prefix, PATH1, POST, option).json(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1cszvff['post']['resBody'], BasicHeaders, Methods_1cszvff['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
    google_authentication: {
      post: (option: { body: Methods_10oxnvc['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_10oxnvc['post']['status']>(prefix, PATH2, POST, option).send(),
      $post: (option: { body: Methods_10oxnvc['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_10oxnvc['post']['status']>(prefix, PATH2, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    login: {
      post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_idk8rz['post']['status']>(prefix, PATH3, POST, option).send(),
      $post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_idk8rz['post']['status']>(prefix, PATH3, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    logout: {
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['post']['status']>(prefix, PATH4, POST, option).send(),
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['post']['status']>(prefix, PATH4, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    me: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody'], BasicHeaders, Methods_1uc1f5c['get']['status']>(prefix, PATH5, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody'], BasicHeaders, Methods_1uc1f5c['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    ping: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1lgtes2['get']['status']>(prefix, PATH6, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1lgtes2['get']['status']>(prefix, PATH6, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    register: {
      post: (option: { body: Methods_1pbnd9f['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1pbnd9f['post']['status']>(prefix, PATH7, POST, option).send(),
      $post: (option: { body: Methods_1pbnd9f['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1pbnd9f['post']['status']>(prefix, PATH7, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
    reset_password: {
      post: (option: { body: Methods_1i354bd['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1i354bd['post']['status']>(prefix, PATH8, POST, option).send(),
      $post: (option: { body: Methods_1i354bd['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1i354bd['post']['status']>(prefix, PATH8, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH8}`,
    },
    user: {
      patch: (option: { body: Methods_tli9od['patch']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_tli9od['patch']['status']>(prefix, PATH9, PATCH, option).send(),
      $patch: (option: { body: Methods_tli9od['patch']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_tli9od['patch']['status']>(prefix, PATH9, PATCH, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH9}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;

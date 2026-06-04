export const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const COLLECTIONS_V1 = [
  {
    id:      'get-post',
    name:    'Get Single Post',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts/1',
    body:    '',
    headers: '',
  },
  {
    id:      'get-all',
    name:    'Get All Posts',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts',
    body:    '',
    headers: '',
  },
  {
    id:      'create-post',
    name:    'Create Post',
    method:  'POST',
    url:     'https://jsonplaceholder.typicode.com/posts',
    body:    '{\n  "title": "New Post",\n  "body": "Hello World",\n  "userId": 1\n}',
    headers: '',
  },
  {
    id:      'get-user',
    name:    'Get User Profile',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/users/1',
    body:    '',
    headers: '{\n  "X-Custom-Header": "playground"\n}',
  },
  {
    id:      'not-found',
    name:    '404 Not Found',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts/99999',
    body:    '',
    headers: '',
  },
];

export const COLLECTIONS_V2 = [
  {
    id:      'get-post',
    name:    'Get Single Post',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts/1',
    params:  '',
    body:    '',
    headers: '',
  },
  {
    id:      'get-all',
    name:    'Get All Posts',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts',
    params:  '',
    body:    '',
    headers: '',
  },
  {
    id:      'create-post',
    name:    'Create Post',
    method:  'POST',
    url:     'https://jsonplaceholder.typicode.com/posts',
    params:  '',
    body:    '{\n  "title": "New Post",\n  "body": "Hello World",\n  "userId": 1\n}',
    headers: '',
  },
  {
    id:      'get-user',
    name:    'Get User Profile',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/users/1',
    params:  '',
    body:    '',
    headers: '{\n  "X-Custom-Header": "playground"\n}',
  },
  {
    id:      'get-by-user',
    name:    'Posts by User (params)',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts',
    params:  '{\n  "userId": 1,\n  "_limit": 3\n}',
    body:    '',
    headers: '',
  },
  {
    id:      'not-found',
    name:    '404 Not Found',
    method:  'GET',
    url:     'https://jsonplaceholder.typicode.com/posts/99999',
    params:  '',
    body:    '',
    headers: '',
  },
];

const STATUS_TEXT = {
  200: '200 OK',
  201: '201 Created',
  204: '204 No Content',
  400: '400 Bad Request',
  401: '401 Unauthorized',
  403: '403 Forbidden',
  404: '404 Not Found',
  500: '500 Internal Server Error',
};

export function statusLabel(code) {
  return STATUS_TEXT[code] ?? (code ? String(code) : '');
}

export function statusClass(code) {
  if (!code)      return '';
  if (code < 300) return 'status-ok';
  if (code < 400) return 'status-redirect';
  return 'status-error';
}

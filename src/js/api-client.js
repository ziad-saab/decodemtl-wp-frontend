/*
  This module is used to make API calls to WordPress.
  It uses the isomorphic-fetch library which exports a fetch function.
  In essence, fetch takes a URL and returns a promise for the respone.
  It's the little brother of XMLHttpRequest, and it works on the server too.
*/

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

import {API_URL} from './config';

export function fetchStudents() {
  return fetch(API_URL + '/student')
    .then(res => res.json());
}

export function fetchPage(slug) {
  return fetch(API_URL + '/pages?' + querystring.stringify({'filter[pagename]': slug}))
    .then(res => res.json())
    .then(res => res[0])
}

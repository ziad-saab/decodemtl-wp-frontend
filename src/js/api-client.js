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

export function fetchPage(slug, language) {
  return fetch(API_URL + '/pages?' + querystring.stringify({'filter[pagename]': slug, lang: language}))
    .then(res => res.json())
    .then(res => res[0]);
}

export function fetchCourse(slug, language) {
  slug = slug.replace(/[^a-z0-9-]/g, '');
  return fetch(API_URL + `/course/${slug}?` + querystring.stringify({lang: language}))
    .then(res => res.json());
}

export function fetchBlog(language) {
  return fetch(API_URL + '/posts?' + querystring.stringify({lang: language}))
    .then(res => res.json());
}

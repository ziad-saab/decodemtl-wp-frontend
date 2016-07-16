import frenchMessages from '../../language/fr';
import LOAD_COURSE_SUCCESS from './courses';

const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

export const DEFAULT_LANGUAGE = 'en';
const DEFAULT_EN_PATH = '/';
const DEFAULT_FR_PATH = '/';

const initialState = {
  language: DEFAULT_LANGUAGE,
  messages: {},
  frLink: DEFAULT_FR_PATH,
  enLink: DEFAULT_EN_PATH
};

/*
  This module takes care of the i18n logic.
  Since we only have two languages, we avoided using a dynamic array
  en is default, fr has translated messages

  We export an action called switchLanguage which is used by onEnter in the router
*/
export default function reducer(state=initialState, action={}) {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      const messages = action.language === 'en' ? {} : frenchMessages;
      return {
        ...state,
        language: action.language,
        messages: messages
      };

    case LOAD_COURSE_SUCCESS:
      const course = action.result;
      let enLink, frLink;
      if (course) {
        enLink = '/courses/' + url.parse(course.link_en).path.replace('/course/', '');
        frLink = '/fr/cours/' + url.parse(course.link_fr).path.replace('/fr/course/', '');
      }
      else {
        enLink = DEFAULT_EN_PATH;
        frLink = DEFAULT_FR_PATH;
      }

      return {
        ...state,
        enLink,
        frLink
      };
  }

  return state;
}

export function switchLanguage(language) {
  return {
    type: SWITCH_LANGUAGE,
    language
  }
}

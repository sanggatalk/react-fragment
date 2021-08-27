// const API_DEVELOPMENT_SERVER_URL = ``;
const API_PRODUCTION_SERVER_URL = `http://3.37.191.46/api`;

const SERVER = {
  url: API_PRODUCTION_SERVER_URL
}

const DEFAULT_FONT = "NotoSansKR";

const FONT = {
  black: `${DEFAULT_FONT}-Black`,
  bold: `${DEFAULT_FONT}-Bold`,
  light: `${DEFAULT_FONT}-Light`,
  medium: `${DEFAULT_FONT}-Medium`,
  regular:  `${DEFAULT_FONT}-Regular`,
  thin: `${DEFAULT_FONT}-Thin`,
}

const COLOR = {
  lightlightGray: '#F8F8F8', // customed
  lightGray: '#BFBFBF',
  gray: '#7E7E7E',
  superGray: '#3F3F3F',
  black: '#000000',
  blue: '#0F3292',
  orange: '#FF6600',

  white: '#FFFFFF', // customed
  
  opacity: {
    halfBlack: 'rgba(0, 0, 0, 0.5)'
  }
}

const HANDLED_ERROR_MESSAGE = {
  BAD_REQUEST: 'Request failed with status code 400',
  UNAUTHORIZED: 'Request failed with status code 401'
}

const TEXT = {
  UNDEFINED_ERROR: '서버 내부 에러 발생. 잠시 후 다시 시도해주세요.',
  NAVIGATION: {
    LOGIN_BTN: 'Login',
    LOGOUT_BTN: '로그아웃',
  },
  LOGIN_PAGE: {
    ID_INPUT_TEXT: '아이디를 입력하세요.',
    PW_INPUT_TEXT: '비밀번호를 입력하세요.',
    LOGIN_BUTTON: '로그인',
    INVALID_INPUT_ID: '아이디를 입력해주세요.',
    INVALID_INPUT_PW: '비밀번호를 입력해주세요.',
    LOGIN_FAIL: '계정 정보가 올바르지 않습니다. 다시 시도해주세요.'
  }
}

export {
  FONT,
  COLOR,
  SERVER,
  HANDLED_ERROR_MESSAGE,
  TEXT
}
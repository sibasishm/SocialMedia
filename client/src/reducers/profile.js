import {
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  UPDATED_FOLLOWERS,
  UPDATING_FOLLOWERS
} from '../actions/types';

const initialState = {
  current: null,
  me: null,
  all: [],
  loading: true,
  followerLoading: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        me: state.me ? { ...state.me, ...payload } : payload,
        loading: false
      };
    case UPDATING_FOLLOWERS:
      return {
        ...state,
        followerLoading: true
      };
    case UPDATED_FOLLOWERS:
      return {
        ...state,
        current: { ...state.current, followers: payload },
        followerLoading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        followerLoading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        current: null,
        me: null,
        loading: false
      };
    default:
      return state;
  }
}

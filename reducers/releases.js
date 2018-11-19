import {RECEIVE_RELEASES, TIP_TRACK} from '../constants/Actions';

export default function releases(state = [], action) {
  switch (action.type) {
    case RECEIVE_RELEASES:
      return action.releases ? action.releases : state;
    case TIP_TRACK: {
      //update tip count in store
      return state.map((item, index) => {
        if (item.trackId !== action.trackId) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          directTipCount: item.directTipCount + 1,
        };
      });
    }
    default:
      return state;
  }
}
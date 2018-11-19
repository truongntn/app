import {fetchAccessToken} from './index';
import {RECEIVE_RELEASES} from '../constants/Actions';
import {fetchGetData} from '../tools/util';

function receiveReleases(json) {
  const releases = json.data;

  return {
    type: RECEIVE_RELEASES,
    releases,
  };
}

async function fetchReleasesJson(token) {

  var params = {
    'accessToken': token,
    'limit': '10',
  };

  let releases = await fetchGetData('release/recent?', params);

  if (releases.data != []) {

    for (let i = 0; i < releases.data.length; i++) {
      let trackPartArray = releases.data[i].trackURL.split('/');
      let trackId = trackPartArray[trackPartArray.length - 1];
      let releaseDetails = await fetchReleaseDetailsJson(token, trackId);
      releases.data[i] = {...releaseDetails.data, ...releases.data[i], trackId};
      let trackImgArray = releases.data[i].trackImg.split('/');
      let trackImg = await fetchTrackImageJson(trackImgArray[trackImgArray.length - 1]);
      releases.data[i].trackImg = trackImg;
    }
    return releases;
  } else {
    return releases;
  }
}

async function fetchReleaseDetailsJson(token, trackId) {
  var params = {
    'accessToken': token,
  };

  let releaseDetails = await fetchGetData(`release/details/${trackId}?`, params);
  return releaseDetails;
}

export function fetchReleases() {
  return function(dispatch, getState) {
    let accessToken = getState().accessToken;
    let diff = (Math.abs(accessToken.receivedAt - Date.now())) / 1000 / 60;
    if (diff >= 58) {
      // get a new token
      dispatch(fetchAccessToken()).then(() => {return fetchReleasesJson(getState().accessToken.token).then(json => dispatch(receiveReleases(json)));});

    } else {
      return fetchReleasesJson(accessToken.token).then(json => dispatch(receiveReleases(json)));
    }
  };
}

async function fetchTrackImageJson(imageId) {
  try {
    return fetch(`https://musicoin.org/i2i/${imageId}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    }).then(response => {
      return response.json();
    }).catch(e => {
      console.log(e);
      return 'https://i.redd.it/y2hj9ovrrne11.jpg';
    });
  } catch (e) {
    console.log(e);
  }
}
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: '236203659',
  width: 1080,
});
const VIDEOCUTTENT_TIME_KEY = 'videoplayer-current-time';
const timer = e => {
  localStorage.setItem(VIDEOCUTTENT_TIME_KEY, e.seconds);
};

player.on('timeupdate', throttle(timer, 1000));

player
  .setCurrentTime(localStorage.getItem(VIDEOCUTTENT_TIME_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    // console.log('played the video!');

    localStorage.setItem('videoplayer-current-time', data.seconds);
  }),
  1000
);

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
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

// решение 2:

//   import Player from '@vimeo/player';
//   import throttle from 'lodash.throttle';

//   const iframe = document.querySelector('iframe');
//   const player = new Player(iframe);

//   const onPlay = function (data) {
//     // data is an object containing properties specific to that event
//     localStorage.setItem('videoplayer-current-time', data.seconds);

//     //   console.log(data.seconds);
//   };

//   player.on('timeupdate', throttle(onPlay, 1000));

//   player.setCurrentTime(
//     Number(localStorage.getItem('videoplayer-current-time'))
//   );

'use strict'

import PopUp from './pop.js';
import * as sound from './sound.js'
import {GameBulder, Reason } from './game.js';


const gameFinishBanner = new PopUp();
const game = new GameBulder() // GameBuilder 오브젝트가 생성됨
.gameDuration(5)
.withCarrotCount(3) // 각각 함수에서 return this; 를 하니깐 위에서 생성된 GameBuilder 오브젝트가 리턴됨
.withBugCount(3) //마찬가지로 GameBuilder 오브젝트가 리턴됨
.build(); // 최종적으로 build에서 Game 오브젝트가 리턴됨

game.setGameStopListener(reason => {
  console.log(reason)
  let message;
  switch (reason) {
    case Reason.cencel:
      message = "Replay?";
      sound.playAlert();
      break;
    case Reason.win:
      message = "You Won";
      sound.playWin();
      break;
    case Reason.lose:
      message = "You Lost";
      sound.playBug();
      break;
      default:
        throw new Error('error')
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
  game.start();
})

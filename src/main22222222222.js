'use strict'

//카운트나 문자 
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT =5;
const GAME_DURATION_SEC =5

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up')
const popUpText = document.querySelector('.pop-up__msg')
const popUpRefresh = document.querySelector('.pop-up__refresh')

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick)

gameBtn.addEventListener('click', ()=>{
  if(started){ //시작이 한상태면,
    stopGame();
  }else {//시작이 아직 안한상태면,
    startGame();
  }
});

popUpRefresh.addEventListener('click', ()=>{
  startGame();
  hidePopUp();
})

function startGame() {
  started=true
  initGame(); // 이미지 (bug,carrot)를 만들고 랜덤으로 배치함.
  showStopButton();//재생버튼이 사라지고 정지버튼이 생김.
  showTimerAndScore();//타이머와 스코어가 생김. (다른코드에서 히든을 해놓아서 함.)
  startGameTimer();//1초마다 바뀌는 타이머
  playSound(bgSound)//사운드
}

function stopGame() {
  started = false;
  stopGameTimer(); //타이머 멈춤, 버튼 사라짐, 팝업 맨트 
  showPopUpWithText('replay?');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win){
  started = false;
  hideGameButton();
  if(win){
    playSound(winSound)
  }else {
    playSound(bugSound)
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? 'You WON' : 'You Lost');
}


function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
};

function hideGameButton() {
  gameBtn.style.visibility ='hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec)
  timer = setInterval(() => {
    if(remainingTimeSec <= 0){
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000);
  
}

function stopGameTimer() {
  clearInterval(timer);
  hideGameButton();
  showPopUpWithText('REPLAY?')
};

function updateTimerText(time){
  const minutes =Math.floor(time/60);
  const seconds =time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
};

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp(){
  popUp.classList.add('pop-up--hide');
};

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생선한뒤 field에 추가해줌
  addItem('carrot',5, 'img/carrot.png');
  addItem('bug',5, 'img/bug.png');
  console.log('asd')
}

function onFieldClick(event){
  if (!started){
    return
  }
  const target = event.target;

  if(target.matches('.carrot')){
    //당근!
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if(score === CARROT_COUNT){
      finishGame(true);
    }
  }
  else if(target.matches('.bug')){
    //벌레!
    finishGame(false);
  }
  
}

function playSound(sound){
  sound.carrotSound = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}
function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score
}

function addItem(className, count, imgPath) {
  const x1 =0;
  const y1 =0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i=0; i< count ; i++){
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
};


function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


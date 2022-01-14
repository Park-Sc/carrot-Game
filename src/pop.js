'use strict';

//클래스를 바깥으로 노출시킴
export default class PopUp {
    constructor() {
      console.log(this)
        this.popUp = document.querySelector('.pop-up');
        console.log(this)
        this.popUpText = document.querySelector('.pop-up__msg');
        console.log(this)
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }


    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}
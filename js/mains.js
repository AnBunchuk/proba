'use strict'

class Calc {
    constructor({ wrapper, form, dataSelect, input, img }) {

        this.wrapper = document.querySelector(wrapper);
        this.calc = this.wrapper.querySelectorAll(form);
        this.dataSelect = document.getElementById(dataSelect)
        this.inputHome = document.getElementById(input);
        this.img = document.querySelector(img)
        this.homeValue;
        this.allPrice = 0;


    }

    selectHome() {
        this.inputHome.oninput = (e) => {


            let homValue = e.target.value
            console.log(homValue)


            if (homValue === 'офис') {
                this.img.setAttribute('src', 'img/office.png')
                this.homeValue = '200';
            }
            if (homValue === 'квартира') {
                this.img.setAttribute('src', 'img/apartment.png')
                this.homeValue = '100';
            }
            if (homValue === 'дом') {
                this.img.setAttribute('src', 'img/home.png')
                this.homeValue = '300';
            }


        }
    }

    selectCalc() {
        this.wrapper.addEventListener('click', (e) => {
            console.log(e.target.id)

            // убирать выбор перед повторным нажатием
            if (e.target.id === 'type_home' && this.calc[0][0].value != '') {
                // console.log(!this.calc[0][0].value)
                this.calc[0][0].value = ''
            }

            if (e.target.id === 'type_room' && this.calc[1][0].value != '') {
                // console.log(this.calc[1][0].value)
                this.calc[1][0].value = ''
            }


            if (e.target.id === "+") {

                let form1 = this.calc[0]
                let form2 = this.calc[1]

                let formHome = form1[0].value
                // console.dir(formHome)
                let formRoom = form2[0].value
                // console.dir(formRoom)
                let formSquare = form2[1].value
                // console.dir(formSquare)

                // защита от пустых полей!!!
                if (!formHome || !formRoom || !formSquare) return;

                this.addList(formHome, formRoom, formSquare, this.homeValue)
                this.inputReset(e)
            }

            if (e.target.id === "-") {
                console.log(this.allPrise)
                console.dir(e.target.parentNode.children[3].innerText)
                this.allPrice = this.allPrice - Number(e.target.parentNode.children[3].innerText)
                console.log(this.allPrise)
                e.target.parentNode.remove()
            }

            if (e.target.id === "itog") {
                // если оставить только здесь то общая сумма будет
                //  меняться только после нажатия кнопки "РАСЧИТАТЬ"
                this.allCalc(e)
            }
            // если надо видеть общую сумму сразу
            this.allCalc(e)
        })

    }
    // добавляем новый div c информацией
    addList(home, room, square, homeValue) {
        let div = document.createElement('div')
        this.dataSelect.append(div)

        let span1 = document.createElement('span')
        // span1.classList.add('home')
        span1.insertAdjacentText('afterbegin', home)
        div.append(span1)

        let span2 = document.createElement('span')
        span2.insertAdjacentText('afterbegin', room)
        div.append(span2)

        let span3 = document.createElement('span')
        span3.insertAdjacentText('afterbegin', square + ' м.кв')
        div.append(span3)

        let span4 = document.createElement('span')
        let price = this.homeValue * square
        span4.insertAdjacentText('afterbegin', Math.round(price))
        div.append(span4)

        let span5 = document.createElement('span')
        span5.insertAdjacentText('afterbegin', 'грн')
        div.append(span5)

        // какькулятор при дабовлении элемента
        this.allPrice += price

        let inputMinus = document.createElement('input')
        inputMinus.setAttribute('id', '-')
        inputMinus.setAttribute('value', '-')
        div.append(inputMinus)

        console.log(square)

    }
    // подсчет общей суммы
    allCalc(e) {
        let spanPrice = document.getElementsByClassName('price2')
        spanPrice[0].innerText = Math.round(this.allPrice)
        console.log(spanPrice)

    }
    // сборс заполненных полей после ввода
    inputReset(e) {
        // this.calc[0][0].value = ''//чтобы оставалось поле выбора помещения
        this.calc[1][0].value = ''
        this.calc[1][1].value = ''
    }

    init() {
        this.selectHome();
        this.selectCalc()

    }

}






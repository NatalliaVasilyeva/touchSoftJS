/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */

/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a
 */
function log(a) {
    console.log(a);
}

/* Раместите ваш код ниже */

/**
 * реализовать фукнцию `fizzBuzz`
 * которая выводит числа от 1 до 100.
 * Если число кратно 3 - вместо числа вывести `Fizz`.
 * Если кратно 5 - вывести вместо числа `Buzz`.
 * Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`.
 * Для вывода использовать фукнцию `log` (аналогично заданию в классе).
 * В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
 */
function fizzBuzz() {
    /* Ваше решение */
    for (var i = 1; i <= 100; i++) {
        (i % 3 == 0 && i % 5 == 0 && log("FizzBuzz")) ||
        (i % 3 == 0 && log("Fizz")) ||
        (i % 5 == 0 && log("Buzz")) ||
        log(i);
    }
}

/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    /* Ваше решение */
    var oldArray = textString.split('');
    var newArray = oldArray.reverse();
    return oldArray === newArray;
}


/**
 * Реализовать фукнцию `drawCalendar` ,
 * которая принимает три аргумента - год, месяц, htmlElement
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).
 * @param {number} year
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl
 */
function drawCalendar(year, month, htmlEl) {
    /* Ваше решение */

        // month for correct getting date( month begin from 0)
    var needMonth=month-1;

    // make date from year and month
    var date = new Date(year, needMonth);

    // create top of table
    var calendarTable = '<table><tr><th>Mn</th><th>Tu</th><th>Wd</th><th>Tr</th><th>Fr</th><th>St</th><th>Sn</th></tr>';


    // convert day of Date to normal sense(sunday is 7 day in week, not 0)
    function getDayWeekNumber(date){
        var dayNumber=date.getDay();
        if (dayNumber==0){
            return 7;
        }
        return dayNumber-1;
    }

    //make td if first day not monday
    for(var i=0; i<getDayWeekNumber(date); i++){
        calendarTable+='<td></td>';
    }


    // create calendar
    while(date.getMonth()==needMonth){
        calendarTable+='<td>' + date.getDate() + '</td>';
        if(getDayWeekNumber(date)%7===6){
            calendarTable+='</tr><tr>';
        }
        date.setDate(date.getDate()+1);
    }

    //create td if last day not sunday
    for (i = getDayWeekNumber(date); i < 7; i++) {
        calendarTable += '<td></td>';
    }
    calendarTable += '</td></table>';

    //add table to element
    htmlEl.innerHTML=calendarTable;
}

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    /* Ваше решение */

    if(objA===objB){
        return true;
    }
    if(objA==null&&objA !==typeof 'Object' || objB==null&&objB !==typeof 'Object'){
        return false;
    }
    if (typeof objA != typeof objB) {
        return false;
    }

    if (typeof objA == 'string' || typeof objA == 'number' || typeof objA == 'boolean') {
        return objA == objB;
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length !== objB.length) {
            return false;
        }
        for (var i = 0; i <= objA.length; i++) {
            if (!isDeepEqual(objA[i], objB[i])) {
                return false;
            }
        }
        return true;
    }

     var result=true;
    for(var key in objA){
        if (typeof(objA) === 'object' && typeof(objB) === 'object') {
            if (!isDeepEqual(objA[key], objB[key])) {
                result= false;
            }
            else{
                if (objA[key] !== objB[key]) {
                    result= false;
                }
            }
        }
    }

    if(JSON.stringify(objA)!==JSON.stringify(objB)){
       return false;
    }
    return true;
}
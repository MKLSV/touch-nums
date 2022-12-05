'use strict'

var boardSize = 4
const gBoard = []
var idx = 1
var onPlay = false 
var gInterval
var gStartTime

function onInit() {

    play()
}

function change(level) {
    boardSize = +level.value
    idx = 1
    play()
}
function play() {
    var nums = []
    for (var i = 1; i < boardSize*boardSize + 1; i++) {
        nums.push(i)
    }
    nums = shuffle(nums)
    createBoard(nums)
}

function createBoard(nums) {
    var strHTML = ''
    for (var i = 0; i < boardSize; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < boardSize ; j++) {
            const cell = nums.pop()

            strHTML += `<td class = "number" onclick = "onCellClick(this)">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function onCellClick(cell) {
    var num = +cell.innerText
    if (num === idx) {
        if (num === 1) startTimer()
        if (num === boardSize*boardSize) stopTimer()
        var audio = new Audio('click.wav')
        audio.play()
        cell.style.backgroundColor = 'orange'
        idx ++
    }    

}

function startTimer() {
    gStartTime = Date.now()
    gInterval = setInterval(() => {
        const seconds = (Date.now() -gStartTime) / 1000
        var elH2 = document.querySelector('.time')
        elH2.innerText = seconds.toFixed(3)
    })
}

function stopTimer() {
    clearInterval(gInterval)
}

function reset() {
    idx = 1
    clearInterval(gInterval)
    play()
}


function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length)
        keep = items[i]
        items[i] = items[randIdx]
        items[randIdx] = keep
    }
    return items
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
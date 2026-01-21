const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result');
const winScoreDisplay = document.getElementById('score-win');
const drawScoreDisplay = document.getElementById('score-draw');
const loseScoreDisplay = document.getElementById('score-lose');
const resetButton = document.getElementById('reset');
const resetModal = document.getElementById('reset-modal');
const confirmResetButton = document.getElementById('confirm-reset');
const cancelResetButton = document.getElementById('cancel-reset');
const languageSelect = document.getElementById('language');
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const choices = ['rock', 'paper', 'scissors'];
const emoji = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

const translations = {
    ko: {
        title: '가위바위보',
        languageLabel: '언어',
        computer: '컴퓨터',
        user: '유저',
        rock: '바위',
        paper: '보',
        scissors: '가위',
        scoreWin: '승',
        scoreDraw: '무',
        scoreLose: '패',
        reset: '스코어 리셋',
        modalTitle: '스코어를 초기화할까요?',
        modalBody: '현재 기록이 모두 0으로 돌아갑니다.',
        confirm: '초기화',
        cancel: '취소',
        resultWin: '이겼습니다!',
        resultLose: '졌습니다!',
        resultDraw: '비겼습니다!'
    },
    en: {
        title: 'Rock Paper Scissors',
        languageLabel: 'Language',
        computer: 'Computer',
        user: 'You',
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors',
        scoreWin: 'Win',
        scoreDraw: 'Draw',
        scoreLose: 'Loss',
        reset: 'Reset Score',
        modalTitle: 'Reset the score?',
        modalBody: 'All records will return to zero.',
        confirm: 'Reset',
        cancel: 'Cancel',
        resultWin: 'You win!',
        resultLose: 'You lose!',
        resultDraw: "It's a draw!"
    }
};

let currentLanguage = 'ko';
let lastResultStatus = null;

const score = {
    win: 0,
    draw: 0,
    lose: 0
};

const updateScoreboard = () => {
    winScoreDisplay.textContent = score.win;
    drawScoreDisplay.textContent = score.draw;
    loseScoreDisplay.textContent = score.lose;
};

const resetScoreboard = () => {
    score.win = 0;
    score.draw = 0;
    score.lose = 0;
    updateScoreboard();
    resultDisplay.textContent = '';
    resultDisplay.classList.remove('result--win', 'result--lose', 'result--draw', 'result--pulse');
    lastResultStatus = null;
};

const openResetModal = () => {
    resetModal.classList.add('is-visible');
    resetModal.setAttribute('aria-hidden', 'false');
};

const closeResetModal = () => {
    resetModal.classList.remove('is-visible');
    resetModal.setAttribute('aria-hidden', 'true');
};

const applyTranslations = () => {
    const dictionary = translations[currentLanguage];
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });
    if (lastResultStatus) {
        const keyMap = {
            win: 'resultWin',
            lose: 'resultLose',
            draw: 'resultDraw'
        };
        resultDisplay.textContent = dictionary[keyMap[lastResultStatus]];
    }
};

const setLanguage = (language) => {
    currentLanguage = language;
    localStorage.setItem('language', language);
    applyTranslations();
};

const initLanguage = () => {
    const saved = localStorage.getItem('language');
    currentLanguage = saved && translations[saved] ? saved : 'ko';
    languageSelect.value = currentLanguage;
    applyTranslations();
};

const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return { text: translations[currentLanguage].resultDraw, status: 'draw' };
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return { text: translations[currentLanguage].resultWin, status: 'win' };
    }
    return { text: translations[currentLanguage].resultLose, status: 'lose' };
};

const handleChoice = (userChoice) => {
    const computerChoice = getComputerChoice();
    userChoiceDisplay.textContent = emoji[userChoice];
    computerChoiceDisplay.textContent = emoji[computerChoice];
    const result = getResult(userChoice, computerChoice);
    resultDisplay.textContent = result.text;
    resultDisplay.classList.remove('result--win', 'result--lose', 'result--draw');
    resultDisplay.classList.add(`result--${result.status}`);
    resultDisplay.classList.remove('result--pulse');
    void resultDisplay.offsetWidth;
    resultDisplay.classList.add('result--pulse');
    score[result.status] += 1;
    updateScoreboard();
    lastResultStatus = result.status;
};

rockButton.addEventListener('click', () => handleChoice('rock'));
paperButton.addEventListener('click', () => handleChoice('paper'));
scissorsButton.addEventListener('click', () => handleChoice('scissors'));
resetButton.addEventListener('click', openResetModal);
confirmResetButton.addEventListener('click', () => {
    resetScoreboard();
    closeResetModal();
});
cancelResetButton.addEventListener('click', closeResetModal);
resetModal.addEventListener('click', (event) => {
    if (event.target === resetModal) {
        closeResetModal();
    }
});
languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));
initLanguage();

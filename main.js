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
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const choices = ['rock', 'paper', 'scissors'];
const emoji = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

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
};

const openResetModal = () => {
    resetModal.classList.add('is-visible');
    resetModal.setAttribute('aria-hidden', 'false');
};

const closeResetModal = () => {
    resetModal.classList.remove('is-visible');
    resetModal.setAttribute('aria-hidden', 'true');
};

const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return { text: '비겼습니다!', status: 'draw' };
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return { text: '이겼습니다!', status: 'win' };
    }
    return { text: '졌습니다!', status: 'lose' };
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

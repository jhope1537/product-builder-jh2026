const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result');
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const choices = ['rock', 'paper', 'scissors'];
const emoji = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
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
};

rockButton.addEventListener('click', () => handleChoice('rock'));
paperButton.addEventListener('click', () => handleChoice('paper'));
scissorsButton.addEventListener('click', () => handleChoice('scissors'));

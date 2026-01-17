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
        return '비겼습니다!';
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return '이겼습니다!';
    } else {
        return '졌습니다!';
    }
};

const handleChoice = (userChoice) => {
    const computerChoice = getComputerChoice();
    userChoiceDisplay.textContent = emoji[userChoice];
    computerChoiceDisplay.textContent = emoji[computerChoice];
    resultDisplay.textContent = getResult(userChoice, computerChoice);
};

rockButton.addEventListener('click', () => handleChoice('rock'));
paperButton.addEventListener('click', () => handleChoice('paper'));
scissorsButton.addEventListener('click', () => handleChoice('scissors'));

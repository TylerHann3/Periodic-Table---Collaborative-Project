const elementData = [
    { name: 'Hydrogen', symbol: 'H', mass: '1.008', category: 'Nonmetal', type: 'nonmetal', group: 1, period: 1, melt: '-259.2°C', boil: '-252.9°C', use: 'Rocket fuel and ammonia production.' },
    { name: 'Helium', symbol: 'He', mass: '4.002', category: 'Noble Gas', type: 'noble', group: 18, period: 1, melt: '-272.2°C', boil: '-268.9°C', use: 'Party balloons, MRI cooling, and deep-sea diving mixes.' },
    { name: 'Lithium', symbol: 'Li', mass: '6.94', category: 'Alkali Metal', type: 'alkali', group: 1, period: 2, melt: '180.5°C', boil: '1342°C', use: 'Rechargeable batteries for phones and electric vehicles.' },
    { name: 'Beryllium', symbol: 'Be', mass: '9.012', category: 'Alkaline Earth Metal', type: 'alkaline', group: 2, period: 2, melt: '1287°C', boil: '2470°C', use: 'Aerospace materials and X-ray windows.' },
    { name: 'Boron', symbol: 'B', mass: '10.81', category: 'Metalloid', type: 'metalloid', group: 13, period: 2, melt: '2076°C', boil: '3927°C', use: 'Borosilicate glass, detergents, and fiberglass.' },
    { name: 'Carbon', symbol: 'C', mass: '12.011', category: 'Nonmetal', type: 'nonmetal', group: 14, period: 2, melt: '3550°C', boil: '4827°C', use: 'Organic compounds, fuels, and carbon fiber.' },
    { name: 'Nitrogen', symbol: 'N', mass: '14.007', category: 'Nonmetal', type: 'nonmetal', group: 15, period: 2, melt: '-210°C', boil: '-195.8°C', use: 'Fertilizers, explosives, and cryogenics.' },
    { name: 'Oxygen', symbol: 'O', mass: '15.999', category: 'Nonmetal', type: 'nonmetal', group: 16, period: 2, melt: '-218.8°C', boil: '-183°C', use: 'Respiration, steel production, and water treatment.' },
    { name: 'Fluorine', symbol: 'F', mass: '18.998', category: 'Nonmetal', type: 'nonmetal', group: 17, period: 2, melt: '-219.7°C', boil: '-188.1°C', use: 'Fluoride compounds in dental care and non-stick coatings.' },
    { name: 'Neon', symbol: 'Ne', mass: '20.180', category: 'Noble Gas', type: 'noble', group: 18, period: 2, melt: '-248.6°C', boil: '-246.1°C', use: 'Neon signs and high-voltage indicators.' },
    { name: 'Sodium', symbol: 'Na', mass: '22.990', category: 'Alkali Metal', type: 'alkali', group: 1, period: 3, use: 'Sodium compounds are used in food, glass, and chemical manufacturing.' },
    { name: 'Magnesium', symbol: 'Mg', mass: '24.305', category: 'Alkaline Earth Metal', type: 'alkaline', group: 2, period: 3, use: 'Lightweight alloys, flares, and fireworks.' },
    { name: 'Aluminium', symbol: 'Al', mass: '26.982', category: 'Metalloid', type: 'metalloid', group: 13, period: 3, use: 'Cans, building materials, and aircraft.' },
    { name: 'Silicon', symbol: 'Si', mass: '28.085', category: 'Metalloid', type: 'metalloid', group: 14, period: 3, use: 'Computer chips, solar cells, and glass.' },
    { name: 'Phosphorus', symbol: 'P', mass: '30.974', category: 'Nonmetal', type: 'nonmetal', group: 15, period: 3, use: 'Fertilizers, safety matches, and detergents.' },
    { name: 'Sulfur', symbol: 'S', mass: '32.06', category: 'Nonmetal', type: 'nonmetal', group: 16, period: 3, use: 'Sulfuric acid production, fertilizers, and rubber processing.' },
    { name: 'Chlorine', symbol: 'Cl', mass: '35.45', category: 'Nonmetal', type: 'nonmetal', group: 17, period: 3, use: 'Water disinfection and household cleaning products.' },
    { name: 'Argon', symbol: 'Ar', mass: '39.948', category: 'Noble Gas', type: 'noble', group: 18, period: 3, use: 'Welding shields, light bulbs, and insulated windows.' },
    { name: 'Potassium', symbol: 'K', mass: '39.098', category: 'Alkali Metal', type: 'alkali', group: 1, period: 4, use: 'Potassium compounds are used in fertilizers and soaps.' },
    { name: 'Calcium', symbol: 'Ca', mass: '40.078', category: 'Alkaline Earth Metal', type: 'alkaline', group: 2, period: 4, use: 'Cement, plaster, and building materials.' }
].map((element, index) => ({ ...element, number: index + 1 }));

const tableGrid = document.getElementById('periodic-grid');
const modal = document.getElementById('element-modal');
let modalReturnFocus = null;

function renderPeriodicTable() {
    elementData.forEach((element) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `periodic-element ${element.type}`;
        const compactColumn = element.number === 2
            ? 2
            : element.group > 2
                ? element.group - 10
                : element.group;
        button.style.gridColumn = String(compactColumn);
        button.style.gridRow = String(element.period);
        button.dataset.symbol = element.symbol;
        button.setAttribute('aria-label', `${element.number} ${element.name}, ${element.mass}`);
        button.innerHTML = `<span class="element-number">${element.number}</span><span class="element-symbol">${element.symbol}</span><span class="element-mass">${element.mass}</span>`;
        tableGrid.appendChild(button);
    });
}

function openElementModal(element, trigger) {
    modalReturnFocus = trigger;
    document.getElementById('modal-symbol').textContent = element.symbol;
    document.getElementById('modal-name').textContent = element.name;
    document.getElementById('modal-category').textContent = element.category;
    document.getElementById('modal-atomic-num').textContent = String(element.number);
    document.getElementById('modal-mass').textContent = element.mass;
    document.getElementById('modal-protons').textContent = String(element.number);
    document.getElementById('modal-melt').textContent = element.melt || 'N/A';
    document.getElementById('modal-boil').textContent = element.boil || 'N/A';
    document.getElementById('modal-use').textContent = element.use;
    modal.hidden = false;
    document.getElementById('modal-close').focus();
}

function closeElementModal() {
    modal.hidden = true;
    modalReturnFocus?.focus();
}

tableGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-symbol]');
    if (!button) return;
    const element = elementData.find(({ symbol }) => symbol === button.dataset.symbol);
    if (element) openElementModal(element, button);
});

document.getElementById('modal-close').addEventListener('click', closeElementModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeElementModal();
});
renderPeriodicTable();

const navTabs = [...document.querySelectorAll('.nav-tab')];
const panels = [...document.querySelectorAll('[data-panel-view]')];

function activatePanel(panelName, focusTab = false) {
    navTabs.forEach((tab) => {
        const isActive = tab.dataset.panel === panelName;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive && focusTab) tab.focus();
    });
    panels.forEach((panel) => {
        const isActive = panel.dataset.panelView === panelName;
        panel.hidden = !isActive;
        panel.classList.toggle('is-active', isActive);
    });
}

navTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activatePanel(tab.dataset.panel));
    tab.addEventListener('keydown', (event) => {
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % navTabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + navTabs.length) % navTabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = navTabs.length - 1;
        else return;
        event.preventDefault();
        activatePanel(navTabs[nextIndex].dataset.panel, true);
    });
});

const resultDisplay = document.getElementById('display');
const keys = document.getElementById('keys');
let expression = '';
let lastResult = null;

function formatExpression(value) {
    return value.replaceAll('*', '×').replaceAll('/', '÷').replaceAll('sqrt(', '√(');
}

function formatNumber(value) {
    if (!Number.isFinite(value)) throw new Error('Math error');
    return Number(value.toPrecision(12)).toString();
}

function calculateExpression(source) {
    const input = source.replace(/\s/g, '');
    const tokens = input.match(/sqrt|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?|[()+\-*/^]/g) || [];
    if (!input || tokens.join('') !== input) throw new Error('Invalid expression');

    let position = 0;
    const peek = () => tokens[position];
    const take = () => tokens[position++];

    function primary() {
        const token = take();
        if (token === '(' || token === 'sqrt') {
            if (token === 'sqrt' && take() !== '(') throw new Error('Invalid square root');
            const value = addition();
            if (take() !== ')') throw new Error('Missing closing bracket');
            if (token === 'sqrt') {
                if (value < 0) throw new Error('Invalid square root');
                return Math.sqrt(value);
            }
            return value;
        }
        if (token === undefined) throw new Error('Incomplete expression');
        const value = Number(token);
        if (!Number.isFinite(value)) throw new Error('Invalid number');
        return value;
    }

    function power() {
        const value = primary();
        return peek() === '^' ? (take(), value ** unary()) : value;
    }

    function unary() {
        if (peek() === '+') return (take(), unary());
        if (peek() === '-') return (take(), -unary());
        return power();
    }

    function multiplication() {
        let value = unary();
        while (peek() === '*' || peek() === '/' || peek() === '(' || /^\d|\./.test(peek() || '')) {
            const operator = peek();
            if (operator === '*' || operator === '/') take();
            const right = unary();
            if (operator === '/' && right === 0) throw new Error('Cannot divide by zero');
            value = operator === '/' ? value / right : value * right;
        }
        return value;
    }

    function addition() {
        let value = multiplication();
        while (peek() === '+' || peek() === '-') {
            const operator = take();
            const right = multiplication();
            value = operator === '+' ? value + right : value - right;
        }
        return value;
    }

    const result = addition();
    if (position !== tokens.length) throw new Error('Invalid expression');
    return result;
}

function showExpression() {
    resultDisplay.textContent = expression ? formatExpression(expression) : '0';
}

function clearDisplay() {
    expression = '';
    lastResult = null;
    showExpression();
}

function appendToDisplay(value) {
    if (lastResult !== null) {
        expression = /^[+\-*/^]$/.test(value) || value === '^2' ? formatNumber(lastResult) : '';
        lastResult = null;
    }
    expression += value;
    showExpression();
}

function backspace() {
    if (lastResult !== null) {
        clearDisplay();
        return;
    }
    expression = expression.slice(0, -1);
    showExpression();
}

function calculate() {
    try {
        lastResult = calculateExpression(expression);
        resultDisplay.textContent = formatNumber(lastResult);
    } catch (error) {
        lastResult = null;
        resultDisplay.textContent = error instanceof Error ? error.message : 'Math error';
    }
}

keys.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const { action, value } = button.dataset;
    if (action === 'calculate') calculate();
    else if (action === 'clear') clearDisplay();
    else if (action === 'backspace') backspace();
    else if (value !== undefined) appendToDisplay(value);
});

const quizSets = {
    1: [
        { question: 'What is the chemical symbol for gold?', answers: [['Go', false], ['Au', true], ['Ag', false], ['Fe', false]] },
        { question: 'What is the atomic number of oxygen?', answers: [['6', false], ['8', true], ['10', false], ['12', false]] },
        { question: 'Which element has the symbol Na?', answers: [['Nitrogen', false], ['Neon', false], ['Sodium', true], ['Nickel', false]] }
    ],
    2: [
        { question: 'Which element is a noble gas?', answers: [['Chlorine', false], ['Neon', true], ['Sodium', false], ['Carbon', false]] },
        { question: 'Which element is the lightest?', answers: [['Helium', false], ['Hydrogen', true], ['Lithium', false], ['Carbon', false]] },
        { question: 'How many protons does carbon have?', answers: [['4', false], ['6', true], ['8', false], ['12', false]] }
    ],
    3: [
        { question: 'How many electrons fit in the first shell?', answers: [['2', true], ['4', false], ['8', false], ['18', false]] },
        { question: 'Which element has the symbol K?', answers: [['Krypton', false], ['Calcium', false], ['Potassium', true], ['Cobalt', false]] },
        { question: 'Which element is a metalloid?', answers: [['Silicon', true], ['Oxygen', false], ['Argon', false], ['Sodium', false]] }
    ]
};

const quizMenu = document.getElementById('quiz-menu');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const quizProgress = document.getElementById('quiz-progress');
const quizFeedback = document.getElementById('quiz-feedback');
const nextButton = document.getElementById('next-btn');
const menuButton = document.getElementById('menu-btn');
let currentQuestions = [];
let currentQuestionIndex = 0;

function shuffled(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
}

function startQuiz(quizNumber) {
    currentQuestions = shuffled(quizSets[quizNumber]);
    currentQuestionIndex = 0;
    quizMenu.hidden = true;
    questionContainer.hidden = false;
    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    answerButtons.replaceChildren();
    quizFeedback.textContent = '';
    quizFeedback.className = 'quiz-feedback';
    quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    questionElement.textContent = question.question;
    nextButton.hidden = true;
    menuButton.hidden = true;

    question.answers.forEach(([text, correct]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-button';
        button.textContent = text;
        button.dataset.correct = String(correct);
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(event) {
    const selectedButton = event.currentTarget;
    const isCorrect = selectedButton.dataset.correct === 'true';
    [...answerButtons.children].forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === 'true') button.classList.add('is-correct');
    });
    if (!isCorrect) selectedButton.classList.add('is-wrong');
    quizFeedback.textContent = isCorrect ? 'Correct!' : 'Not quite. The correct answer is highlighted.';
    quizFeedback.classList.add(isCorrect ? 'is-correct' : 'is-wrong');

    if (currentQuestionIndex + 1 < currentQuestions.length) {
        nextButton.hidden = false;
    } else {
        menuButton.hidden = false;
        menuButton.textContent = 'Finish and return to quizzes';
    }
}

document.querySelectorAll('[data-quiz]').forEach((button) => {
    button.addEventListener('click', () => startQuiz(button.dataset.quiz));
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex += 1;
    showQuestion();
});

menuButton.addEventListener('click', () => {
    questionContainer.hidden = true;
    quizMenu.hidden = false;
});

const builderElements = [
    ['Hydrogen', 'H', [1]], ['Helium', 'He', [2]], ['Lithium', 'Li', [2, 1]],
    ['Beryllium', 'Be', [2, 2]], ['Boron', 'B', [2, 3]], ['Carbon', 'C', [2, 4]],
    ['Nitrogen', 'N', [2, 5]], ['Oxygen', 'O', [2, 6]], ['Fluorine', 'F', [2, 7]],
    ['Neon', 'Ne', [2, 8]], ['Sodium', 'Na', [2, 8, 1]], ['Magnesium', 'Mg', [2, 8, 2]],
    ['Aluminium', 'Al', [2, 8, 3]], ['Silicon', 'Si', [2, 8, 4]], ['Phosphorus', 'P', [2, 8, 5]],
    ['Sulfur', 'S', [2, 8, 6]], ['Chlorine', 'Cl', [2, 8, 7]], ['Argon', 'Ar', [2, 8, 8]],
    ['Potassium', 'K', [2, 8, 8, 1]], ['Calcium', 'Ca', [2, 8, 8, 2]]
].map(([name, symbol, shells], index) => ({ number: index + 1, name, symbol, shells }));

const stage = document.getElementById('atom-stage');
const tray = document.getElementById('electron-tray');
const status = document.getElementById('status-message');
const checkButton = document.getElementById('check-button');
const hintButton = document.getElementById('hint-button');
const builderNextButton = document.getElementById('next-button');
const goalSelect = document.getElementById('goal-select');
const slots = [];
let target;
let previousNumber = 0;
let solved = 0;
let goal = Number(goalSelect.value);

function createSlots() {
    [2, 8, 8, 2].forEach((capacity, shellIndex) => {
        for (let index = 0; index < capacity; index += 1) {
            const angle = 2 * Math.PI * index / capacity - Math.PI / 2;
            const radius = [0.16, 0.27, 0.38, 0.47][shellIndex];
            const slot = document.createElement('div');
            slot.className = 'electron-slot';
            slot.dataset.shell = String(shellIndex + 1);
            slot.style.left = `${50 + Math.cos(angle) * radius * 100}%`;
            slot.style.top = `${50 + Math.sin(angle) * radius * 100}%`;
            slot.setAttribute('aria-label', `Empty slot in shell ${shellIndex + 1}`);
            stage.appendChild(slot);
            slots.push(slot);
        }
    });
}

function updateTrayCount() {
    const count = tray.querySelectorAll('.electron').length;
    document.getElementById('tray-count').textContent = `${count} ${count === 1 ? 'electron' : 'electrons'}`;
}

function resetPlacement() {
    stage.querySelectorAll('.electron').forEach((electron) => {
        electron.classList.remove('is-dragging');
        electron.removeAttribute('style');
        electron.dataset.shell = '';
        tray.appendChild(electron);
    });
    slots.forEach((slot) => {
        slot.classList.remove('is-filled');
        slot.setAttribute('aria-label', `Empty slot in shell ${slot.dataset.shell}`);
    });
    updateTrayCount();
}

function renderChallenge() {
    const choices = builderElements.filter((element) => element.number !== previousNumber);
    target = choices[Math.floor(Math.random() * choices.length)];
    previousNumber = target.number;
    resetPlacement();

    document.getElementById('element-name').textContent = target.name;
    document.getElementById('element-label').textContent = target.name;
    document.getElementById('element-symbol').textContent = target.symbol;
    document.getElementById('nucleus-symbol').textContent = target.symbol;
    document.getElementById('atomic-number').textContent = String(target.number);
    tray.replaceChildren();

    for (let index = 0; index < target.number; index += 1) {
        const electron = document.createElement('button');
        electron.type = 'button';
        electron.className = 'electron';
        electron.setAttribute('aria-label', `Electron ${index + 1}`);
        electron.addEventListener('pointerdown', startDrag);
        tray.appendChild(electron);
    }
    status.className = 'status-line';
    status.textContent = 'Drag each electron into an open shell slot.';
    checkButton.hidden = false;
    hintButton.hidden = false;
    builderNextButton.hidden = true;
    updateTrayCount();
}

function startDrag(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    const electron = event.currentTarget;
    const oldSlot = slots.find((slot) => slot.contains(electron));
    if (oldSlot) {
        oldSlot.classList.remove('is-filled');
        oldSlot.setAttribute('aria-label', `Empty slot in shell ${oldSlot.dataset.shell}`);
    }

    const bounds = electron.getBoundingClientRect();
    electron.classList.add('is-dragging');
    electron.style.left = `${bounds.left}px`;
    electron.style.top = `${bounds.top}px`;
    document.body.appendChild(electron);
    moveDrag(event);
    document.addEventListener('pointermove', moveDrag);
    document.addEventListener('pointerup', finishDrag, { once: true });
}

function moveDrag(event) {
    const electron = document.querySelector('.electron.is-dragging');
    if (!electron) return;
    electron.style.left = `${event.clientX - 13}px`;
    electron.style.top = `${event.clientY - 13}px`;
}

function finishDrag(event) {
    document.removeEventListener('pointermove', moveDrag);
    const electron = document.querySelector('.electron.is-dragging');
    if (!electron) return;

    let nearest = null;
    let nearestDistance = 36;
    slots.forEach((slot) => {
        if (slot.querySelector('.electron')) return;
        const bounds = slot.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - bounds.left - bounds.width / 2, event.clientY - bounds.top - bounds.height / 2);
        if (distance < nearestDistance) {
            nearest = slot;
            nearestDistance = distance;
        }
    });

    electron.classList.remove('is-dragging');
    electron.removeAttribute('style');
    if (nearest) {
        electron.dataset.shell = nearest.dataset.shell;
        nearest.appendChild(electron);
        nearest.classList.add('is-filled');
        nearest.setAttribute('aria-label', `Electron in shell ${nearest.dataset.shell}`);
        status.textContent = 'Electron placed. Continue, then check your answer.';
    } else {
        tray.appendChild(electron);
        status.textContent = 'Not snapped into a slot. Try placing it again.';
    }
    updateTrayCount();
}

function checkAnswer() {
    if (tray.querySelector('.electron')) {
        resetPlacement();
        status.className = 'status-line is-error';
        status.textContent = `Not quite. ${target.name} has ${target.number} electrons. Try again.`;
        return;
    }

    const actual = [1, 2, 3, 4].map((shell) =>
        stage.querySelectorAll(`.electron[data-shell="${shell}"]`).length
    );
    const correct = target.shells.every((count, index) => actual[index] === count) &&
        actual.slice(target.shells.length).every((count) => count === 0);

    if (!correct) {
        resetPlacement();
        status.className = 'status-line is-error';
        status.textContent = `Not quite. ${target.name} has ${target.number} electrons. All electrons returned to the tray.`;
        return;
    }

    solved += 1;
    document.getElementById('score-count').textContent = String(solved);
    status.className = 'status-line is-correct';
    status.textContent = `Correct! ${target.name} has ${target.number} electrons.`;
    checkButton.hidden = true;
    hintButton.hidden = true;
    builderNextButton.textContent = goal > 0 && solved >= goal ? 'Practice again' : 'Next element';
    builderNextButton.hidden = false;
}

checkButton.addEventListener('click', checkAnswer);
hintButton.addEventListener('click', () => {
    status.className = 'status-line';
    status.textContent = `Hint: ${target.name} has ${target.number} electrons. Fill shells from the inside out.`;
});
builderNextButton.addEventListener('click', () => {
    if (goal > 0 && solved >= goal) solved = 0;
    document.getElementById('score-count').textContent = String(solved);
    renderChallenge();
});
goalSelect.addEventListener('change', () => {
    goal = Number(goalSelect.value);
    document.getElementById('score-goal').textContent = goal > 0 ? String(goal) : '∞';
});

createSlots();
document.getElementById('score-goal').textContent = String(goal);
renderChallenge();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
        closeElementModal();
        return;
    }
    const activeElement = document.activeElement;
    const isTypingInControl = activeElement instanceof HTMLElement &&
        (activeElement.matches('button, input, select, textarea') || activeElement.isContentEditable);
    if (document.getElementById('panel-calculator').hidden || isTypingInControl) return;

    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        backspace();
    } else if (event.key === 'Delete') {
        clearDisplay();
    } else if (/^[0-9.+\-*/^()]$/.test(event.key)) {
        appendToDisplay(event.key);
    }
});

const elements = [
    ['Hydrogen', 'H', [1]], ['Helium', 'He', [2]], ['Lithium', 'Li', [2, 1]],
    ['Beryllium', 'Be', [2, 2]], ['Boron', 'B', [2, 3]], ['Carbon', 'C', [2, 4]],
    ['Nitrogen', 'N', [2, 5]], ['Oxygen', 'O', [2, 6]], ['Fluorine', 'F', [2, 7]],
    ['Neon', 'Ne', [2, 8]], ['Sodium', 'Na', [2, 8, 1]], ['Magnesium', 'Mg', [2, 8, 2]],
    ['Aluminium', 'Al', [2, 8, 3]], ['Silicon', 'Si', [2, 8, 4]],
    ['Phosphorus', 'P', [2, 8, 5]], ['Sulfur', 'S', [2, 8, 6]],
    ['Chlorine', 'Cl', [2, 8, 7]], ['Argon', 'Ar', [2, 8, 8]],
    ['Potassium', 'K', [2, 8, 8, 1]], ['Calcium', 'Ca', [2, 8, 8, 2]],
].map(([name, symbol, shells], index) => ({ number: index + 1, name, symbol, shells }));

const stage = document.getElementById('atom-stage');
const tray = document.getElementById('electron-tray');
const status = document.getElementById('status-message');
const checkButton = document.getElementById('check-button');
const hintButton = document.getElementById('hint-button');
const nextButton = document.getElementById('next-button');
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
    stage.querySelectorAll('.electron').forEach(electron => {
        electron.classList.remove('is-dragging');
        electron.removeAttribute('style');
        electron.dataset.shell = '';
        tray.appendChild(electron);
    });
    slots.forEach(slot => {
        slot.classList.remove('is-filled');
        slot.setAttribute('aria-label', `Empty slot in shell ${slot.dataset.shell}`);
    });
    updateTrayCount();
}

function renderChallenge() {
    const choices = elements.filter(element => element.number !== previousNumber);
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
    nextButton.hidden = true;
    updateTrayCount();
}

function startDrag(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    const electron = event.currentTarget;
    const oldSlot = slots.find(slot => slot.contains(electron));
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
    slots.forEach(slot => {
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
    const actual = [1, 2, 3, 4].map(shell =>
        stage.querySelectorAll(`.electron[data-shell="${shell}"]`).length
    );
    const correct = target.shells.every((count, index) => actual[index] === count) &&
        actual.slice(target.shells.length).every(count => count === 0);
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
    nextButton.textContent = goal > 0 && solved >= goal ? 'Practice again' : 'Next element';
    nextButton.hidden = false;
}

checkButton.addEventListener('click', checkAnswer);
hintButton.addEventListener('click', () => {
    status.className = 'status-line';
    status.textContent = `Hint: ${target.name} has ${target.number} electrons. Fill shells from the inside out.`;
});
nextButton.addEventListener('click', () => {
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

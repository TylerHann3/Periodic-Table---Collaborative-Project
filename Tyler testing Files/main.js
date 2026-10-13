let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.getElementById('card');

const snapPoints = [];
const SNAP_THRESHOLD = 40; 

function generateElectronGrid() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const shells = [
        { radius: 80,  capacity: 2 },
        { radius: 160, capacity: 8 },
        { radius: 240, capacity: 8 }
    ];

    snapPoints.length = 0;

    shells.forEach(shell => {
        for (let i = 0; i < shell.capacity; i++) {
            const angle = (2 * Math.PI / shell.capacity) * i;
            const slotX = centerX + shell.radius * Math.cos(angle);
            const slotY = centerY + shell.radius * Math.sin(angle);

            snapPoints.push({
                x: slotX,
                y: slotY,
                isOccupied: false
            });
        }
    });
}

generateElectronGrid();

window.addEventListener('resize', generateElectronGrid);


card.addEventListener('mousedown', mouseDown);

function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    
    const cardCenterX = card.offsetLeft + 12;
    const cardCenterY = card.offsetTop + 12;

    for (let point of snapPoints) {
        const dx = cardCenterX - point.x;
        const dy = cardCenterY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 3) {
            point.isOccupied = false; 
            break;
        }
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    card.style.top = (card.offsetTop - newY) + "px";
    card.style.left = (card.offsetLeft - newX) + "px";
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    
    const cardCenterX = card.offsetLeft + 12;
    const cardCenterY = card.offsetTop + 12;

    let closestPoint = null;
    let minDistance = SNAP_THRESHOLD; 

    for (let point of snapPoints) {
        const dx = cardCenterX - point.x;
        const dy = cardCenterY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance && !point.isOccupied) {
            minDistance = distance;
            closestPoint = point;
        }
    }

    if (closestPoint) {
        card.style.left = (closestPoint.x - 12) + "px";
        card.style.top = (closestPoint.y - 12) + "px";

        closestPoint.isOccupied = true; 
    }
}

export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
    const ctx = screen.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.clearRect(0, 0, 10, 10);

    for (let playerId in game.state.players) {
        const player = game.state.players[playerId];
        ctx.fillStyle = 'black';
        ctx.fillRect(player.x, player.y, 1, 1);
    }

    for (let fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];
        ctx.fillStyle = 'green';
        ctx.fillRect(fruit.x, fruit.y, 1, 1);
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    });
}

const color = 'red';
const x = 20;
const y = 20;
const width = 10;
const height = 10;

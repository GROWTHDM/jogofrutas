export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10,
        }
    }

    const observers = []



    function subscribe(observerFunction){
        observers.push(observerFunction)
    }

    function notifyAll(command){
        for (const observerFunction of observers){
            observerFunction(command)
        }
    }

    function setState(newState){
        Object.assign(state, newState);
    }


    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY,
        })
    }

    function start() {
        const frequency = 2000;
        setInterval(addFruit, frequency);
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        })
    }


    function addPlayer(command){
        const playerId = command.playerId;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerX : Math.floor(Math.random() * state.screen.height);

        state.players[playerId] = {
            x: playerX,
            y: playerY,
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId,
        })
    }

    function movePlayer(command) {
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                player.y = Math.max(player.y - 1, 0);
            },

            ArrowDown(player){
                player.y = Math.min(player.y + 1, state.screen.height - 1);
            },

            ArrowLeft(player){
                player.x = Math.max(player.x - 1, 0);
            },

            ArrowRight(player){
                player.x = Math.min(player.x + 1, state.screen.width - 1);
            }

        }

        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[playerId];
        const moveFunction = acceptedMoves[keyPressed];
        if(player && moveFunction){
            moveFunction(player)
            checkForFruitColittion(playerId);
        }

        function checkForFruitColittion(playerId) {
            const player = state.players[playerId]

            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId]
                console.log(`Checking for ${playerId} and ${fruitId}`)

                if(player.x === fruit.x && player.y === fruit.y){
                    removeFruit({fruitId:fruitId})
                    console.log(`Collision between ${playerId} and ${fruitId}`);
                }
            }

        }
    }



    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
        setState,
        subscribe,
        start,
    }

}


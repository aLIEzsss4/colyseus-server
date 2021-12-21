"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyOffice = void 0;
const colyseus_1 = require("colyseus");
const command_1 = require("@colyseus/command");
const OfficeState_1 = require("./schema/OfficeState");
const Messages_1 = require("../types/Messages");
const PlayerUpdateCommand_1 = __importDefault(require("./commands/PlayerUpdateCommand"));
const PlayerUpdateNameCommand_1 = __importDefault(require("./commands/PlayerUpdateNameCommand"));
const ComputerUpdateArrayCommand_1 = __importDefault(require("./commands/ComputerUpdateArrayCommand"));
const ChatMessageUpdateCommand_1 = __importDefault(require("./commands/ChatMessageUpdateCommand"));
class SkyOffice extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.dispatcher = new command_1.Dispatcher(this);
    }
    onCreate(options) {
        this.setState(new OfficeState_1.OfficeState());
        this.autoDispose = false;
        // HARD-CODED: Add 5 computers in a room
        for (let i = 0; i < 5; i++) {
            this.state.computers.set(String(i), new OfficeState_1.Computer());
        }
        // when a player connect to a computer, add to the computer connectedUser array
        this.onMessage(Messages_1.Message.CONNECT_TO_COMPUTER, (client, message) => {
            this.dispatcher.dispatch(new ComputerUpdateArrayCommand_1.default(), {
                client,
                computerId: message.computerId,
            });
        });
        // when a player disconnect from a computer, remove from the computer connectedUser array
        this.onMessage(Messages_1.Message.DISCONNECT_FROM_COMPUTER, (client, message) => {
            const computer = this.state.computers.get(message.computerId);
            const index = computer.connectedUser.indexOf(client.sessionId);
            if (index > -1) {
                computer.connectedUser.splice(index, 1);
            }
        });
        // when a player stop sharing screen
        this.onMessage(Messages_1.Message.STOP_SCREEN_SHARE, (client, message) => {
            const computer = this.state.computers.get(message.computerId);
            computer.connectedUser.forEach((id) => {
                this.clients.forEach((cli) => {
                    if (cli.sessionId === id && cli.sessionId !== client.sessionId) {
                        cli.send(Messages_1.Message.STOP_SCREEN_SHARE, client.sessionId);
                    }
                });
            });
        });
        // when receiving updatePlayer message, call the PlayerUpdateCommand
        this.onMessage(Messages_1.Message.UPDATE_PLAYER, (client, message) => {
            this.dispatcher.dispatch(new PlayerUpdateCommand_1.default(), {
                client,
                x: message.x,
                y: message.y,
                anim: message.anim,
            });
        });
        // when receiving updatePlayerName message, call the PlayerUpdateNameCommand
        this.onMessage(Messages_1.Message.UPDATE_PLAYER_NAME, (client, message) => {
            this.dispatcher.dispatch(new PlayerUpdateNameCommand_1.default(), {
                client,
                name: message.name,
            });
        });
        // when a player is ready to connect, call the PlayerReadyToConnectCommand
        this.onMessage(Messages_1.Message.READY_TO_CONNECT, (client) => {
            const player = this.state.players.get(client.sessionId);
            if (player)
                player.readyToConnect = true;
        });
        // when a player is ready to connect, call the PlayerReadyToConnectCommand
        this.onMessage(Messages_1.Message.VIDEO_CONNECTED, (client) => {
            const player = this.state.players.get(client.sessionId);
            if (player)
                player.videoConnected = true;
        });
        // when a player disconnect a stream, broadcast the signal to the other player connected to the stream
        this.onMessage(Messages_1.Message.DISCONNECT_STREAM, (client, message) => {
            this.clients.forEach((cli) => {
                if (cli.sessionId === message.clientId) {
                    cli.send(Messages_1.Message.DISCONNECT_STREAM, client.sessionId);
                }
            });
        });
        // when a player send a chat message, update the message array and broadcast to all connected clients except the sender
        this.onMessage(Messages_1.Message.ADD_CHAT_MESSAGE, (client, message) => {
            // update the message array (so that players join later can also see the message)
            this.dispatcher.dispatch(new ChatMessageUpdateCommand_1.default(), {
                client,
                content: message.content,
            });
            // broadcast to all currently connected clients except the sender (to render in-game dialog on top of the character)
            this.broadcast(Messages_1.Message.ADD_CHAT_MESSAGE, { clientId: client.sessionId, content: message.content }, { except: client });
        });
    }
    onJoin(client, options) {
        this.state.players.set(client.sessionId, new OfficeState_1.Player());
    }
    onLeave(client, consented) {
        if (this.state.players.has(client.sessionId)) {
            this.state.players.delete(client.sessionId);
        }
        this.state.computers.forEach((computer) => {
            const index = computer.connectedUser.indexOf(client.sessionId);
            if (index > -1) {
                computer.connectedUser.splice(index, 1);
            }
        });
    }
    onDispose() {
        console.log('room', this.roomId, 'disposing...');
    }
}
exports.SkyOffice = SkyOffice;

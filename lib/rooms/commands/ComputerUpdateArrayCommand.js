"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@colyseus/command");
class ComputerUpdateArrayCommand extends command_1.Command {
    execute(data) {
        const { client, computerId } = data;
        const clientId = client.sessionId;
        const computer = this.room.state.computers.get(computerId);
        if (!computer || computer.connectedUser.includes(clientId))
            return;
        computer.connectedUser.push(clientId);
    }
}
exports.default = ComputerUpdateArrayCommand;

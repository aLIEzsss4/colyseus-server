"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeState = exports.ChatMessage = exports.Computer = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.name = '';
        this.x = 705;
        this.y = 500;
        this.anim = 'adam_idle_down';
        this.readyToConnect = false;
        this.videoConnected = false;
    }
}
__decorate([
    schema_1.type('string')
], Player.prototype, "name", void 0);
__decorate([
    schema_1.type('number')
], Player.prototype, "x", void 0);
__decorate([
    schema_1.type('number')
], Player.prototype, "y", void 0);
__decorate([
    schema_1.type('string')
], Player.prototype, "anim", void 0);
__decorate([
    schema_1.type('boolean')
], Player.prototype, "readyToConnect", void 0);
__decorate([
    schema_1.type('boolean')
], Player.prototype, "videoConnected", void 0);
exports.Player = Player;
class Computer extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.connectedUser = new schema_1.ArraySchema();
    }
}
__decorate([
    schema_1.type(['string'])
], Computer.prototype, "connectedUser", void 0);
exports.Computer = Computer;
class ChatMessage extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.author = '';
        this.createdAt = new Date().getTime();
        this.content = '';
    }
}
__decorate([
    schema_1.type('string')
], ChatMessage.prototype, "author", void 0);
__decorate([
    schema_1.type('number')
], ChatMessage.prototype, "createdAt", void 0);
__decorate([
    schema_1.type('string')
], ChatMessage.prototype, "content", void 0);
exports.ChatMessage = ChatMessage;
class OfficeState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.computers = new schema_1.MapSchema();
        this.chatMessages = new schema_1.ArraySchema();
    }
}
__decorate([
    schema_1.type({ map: Player })
], OfficeState.prototype, "players", void 0);
__decorate([
    schema_1.type({ map: Computer })
], OfficeState.prototype, "computers", void 0);
__decorate([
    schema_1.type([ChatMessage])
], OfficeState.prototype, "chatMessages", void 0);
exports.OfficeState = OfficeState;

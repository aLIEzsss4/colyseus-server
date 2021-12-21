"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var Message;
(function (Message) {
    Message[Message["UPDATE_PLAYER"] = 0] = "UPDATE_PLAYER";
    Message[Message["UPDATE_PLAYER_NAME"] = 1] = "UPDATE_PLAYER_NAME";
    Message[Message["READY_TO_CONNECT"] = 2] = "READY_TO_CONNECT";
    Message[Message["DISCONNECT_STREAM"] = 3] = "DISCONNECT_STREAM";
    Message[Message["CONNECT_TO_COMPUTER"] = 4] = "CONNECT_TO_COMPUTER";
    Message[Message["DISCONNECT_FROM_COMPUTER"] = 5] = "DISCONNECT_FROM_COMPUTER";
    Message[Message["STOP_SCREEN_SHARE"] = 6] = "STOP_SCREEN_SHARE";
    Message[Message["VIDEO_CONNECTED"] = 7] = "VIDEO_CONNECTED";
    Message[Message["ADD_CHAT_MESSAGE"] = 8] = "ADD_CHAT_MESSAGE";
})(Message = exports.Message || (exports.Message = {}));

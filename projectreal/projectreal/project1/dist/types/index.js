export var GameType;
(function (GameType) {
    GameType["MINECRAFT"] = "minecraft";
    GameType["COUNTER_STRIKE"] = "cs";
})(GameType || (GameType = {}));
export var ServerStatus;
(function (ServerStatus) {
    ServerStatus["STARTING"] = "starting";
    ServerStatus["RUNNING"] = "running";
    ServerStatus["STOPPING"] = "stopping";
    ServerStatus["STOPPED"] = "stopped";
    ServerStatus["ERROR"] = "error";
})(ServerStatus || (ServerStatus = {}));

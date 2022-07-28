import { Player } from "../models/player";
import { Identity } from "../valueobjects/identity";

export interface GameFinished {
    gameId: Identity;
    winner: Player;
}

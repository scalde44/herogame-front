import { Identity } from "../valueobjects/identity";

export interface FinishedRound {
    gameId: Identity;
    roundId: Identity;
    winner: Identity;
}

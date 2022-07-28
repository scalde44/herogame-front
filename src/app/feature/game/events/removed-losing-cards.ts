import { Identity } from "../valueobjects/identity";

export interface RemovedLosingCards {
    gameId: Identity;
    winnerId: Identity;
    loserId: Identity;
    roundId: Identity;
}

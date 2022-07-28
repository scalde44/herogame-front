import { Identity } from "../valueobjects/identity";

export interface DistributedWinningCards {
    gameId: Identity;
    winnerId: Identity;
    roundId: Identity;
}

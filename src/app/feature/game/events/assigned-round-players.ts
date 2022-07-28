import { Identity } from "../valueobjects/identity";

export interface AssignedRoundPlayers {
    roundId: Identity;
    players: Set<Identity>;
}

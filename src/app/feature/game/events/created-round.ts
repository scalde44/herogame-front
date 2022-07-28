import { Identity } from "../valueobjects/identity";
import { ValueObject } from "../valueobjects/valueobject";

export interface CreatedRound {
    gameId: Identity;
    roundId: Identity;
    roundNumber: ValueObject;
}

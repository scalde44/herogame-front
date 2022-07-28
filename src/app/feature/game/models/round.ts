import { Identity } from "../valueobjects/identity";
import { ValueObject } from "../valueobjects/valueobject";

export interface Round {
    playerIds: Set<Identity>;
    roundNumber: ValueObject;
    isFinished: boolean;
    winner: Identity;
}

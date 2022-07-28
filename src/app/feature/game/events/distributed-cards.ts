import { Identity } from "../valueobjects/identity";
import { ValueObject } from "../valueobjects/valueobject";

export interface DistributedCards {
    playerId: Identity;
    gameCards: Set<ValueObject>;
}

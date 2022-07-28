import { CardEntity } from "../models/card-entity";
import { Gamecard } from "../models/gamecard";
import { Identity } from "../valueobjects/identity";
import { ValueObject } from "../valueobjects/valueobject";

export interface DistributedCards {
    playerId: Identity;
    gameCards: Set<Gamecard>;
}

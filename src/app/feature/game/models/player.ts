import { ValueObject } from "../valueobjects/valueobject";

export interface Player {
    score: ValueObject;
    userId: string;
    gameCards: Set<ValueObject>;
}

import { ValueObject } from "../valueobjects/valueobject";

export interface CardEntity {
    id:string;
    name: ValueObject;
    power: ValueObject;
    features: Set<ValueObject>;
    image: ValueObject;
}

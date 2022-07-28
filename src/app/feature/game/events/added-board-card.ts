import { Gamecard } from "../models/gamecard";
import { Round } from "../models/round";
import { Identity } from "../valueobjects/identity";

export interface AddedBoardCard {
    identity: Identity; 
    gameCard: Gamecard;
    round: Round; 
}

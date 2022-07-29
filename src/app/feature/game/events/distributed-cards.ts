import { Gamecard } from "../models/gamecard";
import { Identity } from "../valueobjects/identity";

export interface DistributedCards {
    aggregate: string;
    aggregateParentId: string;
    aggregateRootId: string;
    playerId: Identity;
    gameCards: Set<Gamecard>;
    type: string;
    uuid: string;
    versionType: number
    when: string
    
}

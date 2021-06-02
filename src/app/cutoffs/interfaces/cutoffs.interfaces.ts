export interface Achievement {
    id: number;
    name: string;
    aid: number;
}

export interface Faction {
    id: number;
    name: string;
    name_es: string;
    icon: string;
}

export interface Bracket {
    id: number;
    pvp_type: string;
}

export interface Reward {
    id: number;
    achievement: Achievement;
    faction: Faction;
    bracket: Bracket;
    cutoff: number;
}

export interface SeasonResults {
    id: number;
    sid: number;
    season_start_timestamp: Date;
    season_end_timestamp?: Date;
    is_active: boolean;
    rewards: Reward[];
}

export interface Region {
    id: number,
    name: string;
    icon: string;
  }
  
export interface Faction {
    id: number;
    fid?: number;
    name: string;
    name_es?: string;
    icon?: string;
}

export interface SearchRealms {
    id: number;
    slug: string;
    region: string;
    icon: string;
    category: string;
}

export interface Realm {
    category?: string;
    id: number;
    locale?: string;
    name: string;
    region?: Region | string;
    rtype?: string;
    slug?: string;
    timezone?: string;
    icon?: string;
}
  
export interface WowClass {
    id: number;
    name: string;
    name_es?: string;
    color?: string;
    cid?: number;
    power_type?: string;
    icon?: string;
}
  
export interface Race {
    id: number;
    rid?: number;
    name: string;
    name_es?: string;
    faction: Faction;
    is_allied_race?: boolean;
    icon_male?: string;
    icon_female?: string;
    wow_clases: WowClass[];
}
  
export interface Spec {
    name: string;
    id: number;
    icon: string;
    wow_class: number;
}

export interface Bracket {
    id: number;
    pvp_type: string;
}

export interface Rating {
    rating: number;
    won: number;
    lost: number;
    winratio: number;
    played: number;
    bracket: Bracket;
}

export interface Talent {
    id: number;
    spell_id: number;
    talent_id: number;
    name: number;
}

export interface PvpTalent {
    id: number;
    spell_id: number;
    talent_id: number;
    name: number;
}

export interface Covenant {
    name: string;
    id: number;
    cid: number;
}

export interface SoulbindTrait {
    id: number;
    name: string;
    sid: number;
    spell_id: number;
}

export interface Conduit {
    id: number;
    name: string;
    cid: number;
    spell_id: number;
    rank: number;
}

export interface Achievement {
    id: number;
    name: string;
    aid: number;
}

export interface CharacterAchievement {
    name: string;
    date_completed: Date;
    achievement: number;
    aid: number;
    description: string;
}

export interface SeasonReward {
    achievement: Achievement;
    region: Region;
    bracket: Bracket;
    faction: Faction;
    cutoff: number;
}

export interface Season {
    sid: number;
    season_start_timestamp: Date;
    season_end_timestamp: Date;
    rewards: SeasonReward[];
    is_active: boolean;
}
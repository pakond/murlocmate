import { Faction, Region, Race, Realm, WowClass, Spec, Rating, Talent, PvpTalent, Covenant, SoulbindTrait, Conduit, Achievement, CharacterAchievement } from '../../shared/interfaces/shared.interfaces';

export interface SearchCharacters {
    name: string;
    realm: string;
    region: string;
    wow_class: string;
    max_3v3_rating: number;
    max_2v2_rating: number;
}

export interface SearchRegions {
    id: number;
    slug: string;
    region: string;
}

export interface Character {
    achievement_points: number;
    achievements: CharacterAchievement[];
    active_title?: string;
    alters?: SearchCharacters[];
    avatar: string;
    checked: number;
    class_color: string;
    conduits?: Conduit[];
    covenant?: Covenant;
    covenant_rank?: number;
    faction: Faction;
    gender: string;
    guild: string;
    id: number;
    item_level: number;
    label?: string;
    last_search: Date;
    last_update: Date;
    level: number;
    max_2v2_rating?: number;
    max_3v3_rating?: number;
    max_rbg_rating?: number;
    media: string;
    name: string;
    pvp_talents?: PvpTalent[];
    race: Race;
    ratings?: Rating[];
    realm: Realm;
    region: Region;
    soulbind?: unknown;
    soulbind_abilities?: SoulbindTrait[];
    spec?: Spec;
    talents?: Talent[];
    wow_class: WowClass;
  }
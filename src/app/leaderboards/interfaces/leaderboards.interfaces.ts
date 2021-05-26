import { Bracket, Region, Season } from 'src/app/shared/interfaces/shared.interfaces';
import { SearchCharacters } from '../../characters/interfaces/characters.interfaces'

export interface PvpEntry {
    character: SearchCharacters;
    bracket: Bracket;
    season: Season;
    region: Region;
    rank: number;
    rating: number;
    won: number;
    lost: number;
    played: number;
    winratio: number;
    time: Date;
}

export interface LeaderResult {
    count: number;
    next: string;
    results: PvpEntry[];
    previous: string;
}
import { Component, Input, OnChanges } from '@angular/core';
import { Character } from '../../interfaces/characters.interfaces';
import { CharacterAchievement } from '../../../shared/interfaces/shared.interfaces';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-character-achievements',
  templateUrl: './character-achievements.component.html'
})
export class CharacterAchievementsComponent implements OnChanges {

  achievements2v: CharacterAchievement[] = [];
  imgAchievements2v: string = '';
  tooltipAchievements2v: string = '';
  achievements3v: CharacterAchievement[] = [];
  imgAchievements3v: string = '';
  tooltipAchievements3v: string = ''
  achievementsRbg: CharacterAchievement[] = [];
  imgAchievementsRbg: string = '';
  tooltipAchievementsRbg: string = ''
  achievementsRank: CharacterAchievement[] = [];
  imgAchievementsRank: string = '';
  tooltipAchievementsRank: string = ''

  @Input() character!: Character;

  constructor() { }

  ngOnChanges() {
    this.achievements2v = [];
    this.imgAchievements2v = '';
    this.tooltipAchievements2v = '';

    this.achievements3v = [];
    this.imgAchievements3v = '';
    this.tooltipAchievements3v = '';

    this.achievementsRbg = [];
    this.imgAchievementsRbg = '';
    this.tooltipAchievementsRbg = '';

    this.achievementsRank = [];
    this.imgAchievementsRank = '';
    this.tooltipAchievementsRank = '';

    this.processAchievements();
  }

  processAchievements(): void {
    // 2v2
    const achieves2v = [399,400,401,1159];
    achieves2v.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievements2v.push(achieve);
      }
    })
    if (this.achievements2v.length > 0) {
      this.imgAchievements2v = environment.staticImg + '/achievement/' + this.achievements2v[this.achievements2v.length-1].aid + '.png';
      this.achievements2v.forEach((achv) => {
        let date: any = achv.date_completed;
        date = date.split('T');
        date = date[0];
        let name: any = achv.name;
        name = name.split(':');
        name = name[1];
        this.tooltipAchievements2v += `${name}: ${date}\n`;
      })
    }

    // 3v3
    const achieves3v = [402,403,405,1160,5266,5267];
    achieves3v.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievements3v.push(achieve);
      }
    })
    if (this.achievements3v.length > 0) {
      this.imgAchievements3v = environment.staticImg + '/achievement/' + this.achievements3v[this.achievements3v.length-1].aid + '.png';
      this.achievements3v.forEach((achv) => {
        let date: any = achv.date_completed;
        date = date.split('T');
        date = date[0];
        let name: any = achv.name;
        name = name.split(':');
        name = name[1];
        this.tooltipAchievements3v += `${name}: ${date}\n`;
      })
    }

    // rbg
    let achievesRbg: number[];
    if (this.character.faction.name == 'Alliance') {
      achievesRbg = [5330,5331,5332,5333,5334,5335,5336,5337,5359,5339,5340,5341,5357,5343];
    }
    else {
      achievesRbg = [5345,5356,5347,5348,5349,5350,5351,5352,5338,5353,5354,5355,5342,5356];
    }
    achievesRbg.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievementsRbg.push(achieve);
      }
    })
    if (this.achievementsRbg.length > 0) {
      this.imgAchievementsRbg = environment.staticImg + '/achievement/' + this.achievementsRbg[this.achievementsRbg.length-1].aid + '.png';
      this.achievementsRbg.forEach((achv) => {
        let date: any = achv.date_completed;
        date = date.split('T');
        date = date[0] ;
        this.tooltipAchievementsRbg += `${achv.name}: ${date}\n`;
      })
    }

    // ranks
    const achievesRank = [2090,2093,2092,2091];
    achievesRank.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievementsRank.push(achieve);
      }
    })
    if (this.achievementsRank.length > 0) {
      this.imgAchievementsRank = environment.staticImg + '/achievement/' + this.achievementsRank[this.achievementsRank.length-1].aid + '.png';
      this.achievementsRank.forEach((achv) => {
        let date: any = achv.date_completed;
        date = date.split('T');
        date = date[0] ;
        this.tooltipAchievementsRank += `${achv.name}: ${date}\n`;
      })
    }
  }

}

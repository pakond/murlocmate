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
  achievements3v: CharacterAchievement[] = [];
  achievementsRbg: CharacterAchievement[] = [];
  achievementsRank: CharacterAchievement[] = [];

  @Input() character!: Character;

  constructor() { }

  ngOnChanges() {
    this.processAchievements();
  }

  processAchievements(): void {
    // 2v2
    this.achievements2v = [];
    const achieves2v = [399,400,401,1159]
    achieves2v.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievements2v.push(achieve)
      }
    })
    // 3v3
    this.achievements3v = [];
    const achieves3v = [402,403,405,1160,5266,5267]
    achieves3v.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievements3v.push(achieve)
      }
    })
    // rbg
    this.achievementsRbg = [];
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
        this.achievementsRbg.push(achieve)
      }
    })
    // ranks
    this.achievementsRank = [];
    const achievesRank = [2090,2093,2092,2091]
    achievesRank.forEach(numacv => {
      const achieve = this.character.achievements.filter(item => item.aid === numacv)[0];
      if (achieve) {
        this.achievementsRank.push(achieve)
      }
    })
  }

  getAchievement(bracket: string): string | void {
    if (bracket === '2v') {
      return environment.staticImg + '/achievement/' + this.achievements2v[this.achievements2v.length-1].aid + '.png'
    }
    if (bracket === '3v') {
      return environment.staticImg + '/achievement/' + this.achievements3v[this.achievements3v.length-1].aid + '.png'
    }
    if (bracket === 'rbg') {
      return environment.staticImg + '/achievement/' + this.achievementsRbg[this.achievementsRbg.length-1].aid + '.png'
    }
    if (bracket === 'rank') {
      return environment.staticImg + '/achievement/' + this.achievementsRank[this.achievementsRank.length-1].aid + '.png'
    }
  }

  tooltipHtml(bracket: string): string {

    let html: string = '';

    if (bracket === '2v2' && this.achievements2v.length > 0) {
      this.achievements2v.forEach((achv) => {

        let date: any = achv.date_completed
        date = date.split('T')
        date = date[0]

        let name: any = achv.name
        name = name.split(':')
        name = name[1]

        html += `${name}: ${date}\n`
      })
    }
    if (bracket === '3v3' && this.achievements3v.length > 0) {
      this.achievements3v.forEach((achv) => {

        let date: any = achv.date_completed
        date = date.split('T')
        date = date[0]

        let name: any = achv.name
        name = name.split(':')
        name = name[1]

        html += `${name}: ${date}\n`
      })
    }
    if (bracket === 'rbg' && this.achievementsRbg.length > 0) {
      this.achievementsRbg.forEach((achv) => {

        let date: any = achv.date_completed
        date = date.split('T')
        date = date[0] 

        html += `${achv.name}: ${date}\n`
      })
    }
    if (bracket === 'rank' && this.achievementsRank.length > 0) {
      this.achievementsRank.forEach((achv) => {

        let date: any = achv.date_completed
        date = date.split('T')
        date = date[0] 

        html += `${achv.name}: ${date}\n`
      })
    }

    return html

  }

}

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { difference } from 'lodash';

@Injectable()
export class AbilitiesService {

  availableAbilities: String[] = [
    'speed',
    'strength',
    'x-ray vision',
    'flight',
    'mind control',
    'shape shifting',
    'telekinesis'
  ];

  heroAbilities = {

  };

  public getAvailableAbilities = () => this.availableAbilities;

  public setAbilitiesForHero = (hero: Hero, abilities: String[]) => {

    if (this.testForIllegalAbilities(abilities)) {
      throw Error('illegal abilities');
    }

    return this.heroAbilities[hero.id] = abilities;
  }

  public getAbilitiesForHero = (hero: Hero) =>
    this.heroAbilities[hero.id] ? this.heroAbilities[hero.id] : [];

  private testForIllegalAbilities = (abilities: String[]) => abilities
    .map(i => this.availableAbilities.indexOf(i) < 0)
    .reduce((acc, next) => acc || next, false);
}

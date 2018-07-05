import { TestBed, inject } from '@angular/core/testing';

import { AbilitiesService } from './abilities.service';
import { Hero } from './hero';

describe('AbilitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbilitiesService]
    });
  });

  it('should be created', inject([AbilitiesService], (service: AbilitiesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return abilities', inject([AbilitiesService], (service: AbilitiesService) => {
    expect(service.getAvailableAbilities().length).toBeGreaterThan(0);
  }));

  it('should set ability for hero', inject([AbilitiesService], (service: AbilitiesService) => {
    let hero: Hero = { id: 1, name: 'spider boy'};
    let abilities: String[] = ['speed', 'flight']
    expect(() => service.setAbilitiesForHero(hero, abilities)).not.toThrow();
    expect(service.getAbilitiesForHero(hero)).toBe(abilities);
  }));

  it('should only set legal abilities', inject([AbilitiesService], (service: AbilitiesService) => {
    let hero: Hero = { id: 1, name: 'spider boy'};
    let abilities: String[] = ['illegal ability']
    expect(() => service.setAbilitiesForHero(hero, abilities)).toThrow(Error("illegal abilities"));
  }));

});

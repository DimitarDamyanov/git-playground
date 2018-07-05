import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';
import { AbilitiesService } from '../abilities.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  availableAbilities: String[];
  chosenAbilities: String[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private abilitiesService: AbilitiesService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getAvailableAbilities();
    this.getHero(id);
  }

  goBack() {
    this.location.back();
  }

  getHero(id: number): any {
    this.heroService
      .getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.chosenAbilities = this.abilitiesService.getAbilitiesForHero(this.hero);
      });
  }

  getAvailableAbilities(){
    this.availableAbilities = this.abilitiesService
      .getAvailableAbilities();
  }

  toggleAbility(ability: string){
    let index = this.chosenAbilities.indexOf(ability);
    if(index > -1) this.chosenAbilities.splice(index, 1);
    else this.chosenAbilities.push(ability);
  }

  isChecked = (ability: String) => this.chosenAbilities.indexOf(ability) > -1;

  save(): void {
    this.abilitiesService.setAbilitiesForHero(this.hero, this.chosenAbilities);
    this.heroService
      .updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}

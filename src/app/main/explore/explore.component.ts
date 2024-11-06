import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  public selectedMuscleGroup: number = null;
  public selectedEquipment: number = null;

  public exerciseResults = [];

  constructor(private readonly rest: RestService) {}

  ngOnInit() {}

  selectMuscleGroup(event): void {
    this.selectedMuscleGroup = event.detail.value;
    console.log(event);
    this.searchExercises();
  }

  selectEquipment(event): void {
    this.selectedEquipment = event.detail.value;
    console.log(event);
    this.searchExercises();
  }

  searchExercises(): void {
    this.rest
      .get(
        `${environment.apiUrl}/api/exercise?equipmentId=${this.selectedEquipment}&muscleGroupId=${this.selectedMuscleGroup}`
      )
      .then((res) => {
        console.log(res);
        this.exerciseResults = res.data;
      });
  }
}

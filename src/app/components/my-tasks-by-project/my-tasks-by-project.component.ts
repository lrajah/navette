import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tasks-by-project',
  templateUrl: './my-tasks-by-project.component.html',
  styleUrls: ['./my-tasks-by-project.component.scss']
})
export class MyTasksByProjectComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

}

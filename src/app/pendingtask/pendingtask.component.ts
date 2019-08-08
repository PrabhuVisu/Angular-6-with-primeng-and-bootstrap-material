import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/taskService';


@Component({
  selector: 'app-pendingtask',
  providers: [TaskService],
  templateUrl: './pendingtask.component.html',
  styleUrls: ['./pendingtask.component.scss']
})
export class PendingtaskComponent implements OnInit {
  arr: any;
 
  constructor(private taskService: TaskService) {
    this.arr = this.taskService.getTaskList();
    console.log(this.arr);
  }

  ngOnInit() {
  }

  getList() {
    this.taskService.getTaskList();
  }

  getTaskByInstanceId() {
    // this.taskService.getTaskByInstanceId();
   }

}

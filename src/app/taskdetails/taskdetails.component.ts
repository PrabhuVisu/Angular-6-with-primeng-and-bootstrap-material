import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/taskService';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-taskdetails',
  providers: [TaskService],
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})

export class TaskdetailsComponent implements OnInit {
  id: any;
  formField_array: any;
  approver_name = ['Sakthi' , 'Prabhu'];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);
    });
    this.formField_array = this.taskService.getTaskByInstanceId(this.id);
    console.log(this.formField_array);
  }

  ngOnInit() {
  }

  getList() {
    this.taskService.getTaskList();
  }

  assignValue(formField: any) {
    for (let i = 0; i < 10; i++) {
      const element = document.getElementById(formField[i].variable);
      console.log(element);
       }
  }

  approveTask() {
    this.taskService.approveTask(this.id);
  }
}

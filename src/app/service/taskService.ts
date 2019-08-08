import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable()
export class TaskService {
t: any;
  form_array: any;
  formFields_array: any;
  approve_array: any;
    constructor(private http: HttpClient,  private router: Router) {
     this.form_array = [];
     this.formFields_array = [];
     this.approve_array = [];
     }

getTaskList() {

// tslint:disable-next-line:max-line-length
 this.http.get<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/wkf/myTask/list.json?page=1&size=30&sort=createdDate&activitiStatus=IN_PROGRESS&overdueStatus=FALSE', {responseType:  'json'}).subscribe(data => {
 console.log(data);

for (let i = 0; i < data.body.items.length; i++) {
  this.form_array.push({
    'id': data.body.items[i].id,
    'wkfProcessInstanceName': data.body.items[i].wkfProcessInstanceName,
    'wkfTaskType': data.body.items[i].wkfTaskType,
    'dueDate': data.body.items[i].dueDate,
    'status': data.body.items[i].activitiStatus
  });

}

});
return this.form_array;
}
getTaskByInstanceId(id: any) {
  this.formFields_array = [];
  const httpParams = new HttpParams().set('taskInstanceId', id);
  // tslint:disable-next-line:max-line-length
 this.http.get<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/wkf/myTask/getDetails.json' , { params: httpParams, responseType: 'text' as 'json'}).subscribe(async data => {
this.t = JSON.parse(data);
console.log(this.t.Items);
 for (let i = 1; i < this.t.Items.length; i++) {
console.log(this.t.Items[i].value);
this.formFields_array.push({
  'name': this.t.Items[i].fieldName,
  'variable': this.t.Items[i].variable,
  'value': this.t.Items[i].value,
});
console.log(this.formFields_array.length);
}
  });
 return this.formFields_array;
  }
  approveTask(id: any) {
console.log(this.t.Items);
for (let i = 1; i < this.t.Items.length; i++) {
  if (this.t.Items[i].fieldName === 'Select Approver 1 :') {
    this.approve_array.push({
      'taskFormMapId': this.t.Items[i].taskFormMapId,
    'variable': this.t.Items[i].variable,
    'variableValue': 'Prabhu',
  });
  } else if ( this.t.Items[i].fieldName === 'Select Approver 2 :') {
    this.approve_array.push({
      'taskFormMapId': this.t.Items[i].taskFormMapId,
    'variable': this.t.Items[i].variable,
    'variableValue': 'Sakthi',
  });
  }
}
const formData_new = {
  'formFields': this.approve_array
};
    const formData: FormData = new FormData();
    formData.append('wkfTaskInstanceId', id );
    formData.append('taskStatus', 'APPROVED');
    formData.append('formData', JSON.stringify(formData_new) );

    return this.http.post<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/wkf/task/complete', formData, { responseType: 'text' as 'json'}).subscribe( data => {
    console.log(data);
      });
  }

}

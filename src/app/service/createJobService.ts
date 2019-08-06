import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable()
export class CreateJobService {
  parsedResponse: any;
  constructor(private http: HttpClient, private router: Router) { }

  form_array = [];
  formData_new: any;
  createPosition(definitionId: any, priority: any, name: string, formDatas: any) {

   const arr = this.getAttributeValues(formDatas);

    const formData = new FormData();
    formData.append('definitionId', '4');
    formData.append('priority', '1');
    formData.append('name', 'HRMS - Create or Update Position');
    formData.append('formData', arr);

    // tslint:disable-next-line:max-line-length
    return this.http.post<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/wkf/instance/start.json?', formData, { responseType: 'text' as 'json' }).subscribe(data => {
      console.log(formData);
      console.log(data);
    });
  }
 getAttributeValues(formDatas: any) {
    console.log(formDatas);
    const httpParams = new HttpParams().set('definitionId', '4');
    // tslint:disable-next-line:max-line-length
     this.http.get<any>('https://dev.dwp.firstqa.com/server/user/api/v6.6/wkf/startForm/get.json', { params: httpParams, responseType: 'text' as 'json' }).subscribe(data => {
      this.parsedResponse = JSON.parse(data);
      console.log(this.parsedResponse);
      // this.workFlowName = this.parsedResponse.Items[0].requestNameTemplateExpression;
      for (let i = 0; i < formDatas.length; i++) {
        this.form_array.push({
          'taskFormMapId': this.parsedResponse.Items[i + 1].taskFormMapId,
          'variable': this.parsedResponse.Items[i + 1].variable,
          'variableValue': formDatas[i]
        });
      }
    });
    this.formData_new = {
      'formFields': this.form_array
    };
    console.log(this.formData_new.formFields);
    return  JSON.stringify(this.formData_new,  this.replacer);
  }

 replacer(key, value) {
    // Filtering out properties
    console.log('inside replacer');
    console.log('key' + key);
    console.log('value' + value);
    if (value === undefined) {
      return null;
    }
    return value;
  }
}

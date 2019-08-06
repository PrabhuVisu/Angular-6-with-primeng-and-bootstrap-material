import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreateJobService } from 'src/app/service/createJobService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  providers: [CreateJobService, DatePipe],
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css'],
  animations: [routerTransition()]
})
// tslint:disable-next-line:class-name
export class CreatejobComponent implements OnInit {
  createJob: FormGroup;
  showClientInfo: boolean;
  submitted = false;
  userData = ['Java', 'JQuery', 'Javascript', 'Typescript', 'AngularJS', 'ServiceNow'];
  levels = ['Level 1' , 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
  skills_array = [];
  additional_skills = [];
  constructor(public formBuilder: FormBuilder, public jobService: CreateJobService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.skills_array = [];
    this.additional_skills = [];
    this.createJob = this.formBuilder.group({
      positionName: ['', Validators.required],
      clientInfo: [''],
      mandatorySkills: ['', Validators.required],
      goodToHaveSkills: ['', Validators.required],
      skillsRequired: ['', Validators.required],
      NumOfOpenings: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]*')]),
      ExpRequired: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]*')]),
      RelevantExp: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]*')]),
      japaneseRequired: ['', Validators.required],
      japaneseSkillLevel: ['', Validators.required],
      requirementCount: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]*')]),
      clientRefId: [''],
      possibleCloseDate: ['', Validators.required],
    });

  }
  onSubmit() {
    this.submitted = true;
    const definitionId = 4;
    const priority = 1;
    const name = 'HRMS - Create or Update Position';

    // tslint:disable-next-line:quotemark
    const formData = {
      'formFields':
        [{ 'taskFormMapId': '2803', 'variable': 'var16bbb28c760', 'variableValue': this.createJob.value['positionName'] },
        { 'taskFormMapId': '2804', 'variable': 'var16bbb28cc91', 'variableValue': this.createJob.value['clientInfo'] },
        { 'taskFormMapId': '2805', 'variable': 'var16bbb28cfc7', 'variableValue': this.getSkills() },
        { 'taskFormMapId': '2806', 'variable': 'var16bbb292b8a', 'variableValue': this.getAdditionalSkills() },
        { 'taskFormMapId': '2807', 'variable': 'var16bbb292f9d', 'variableValue': this.createJob.value['ExpRequired'] },
        { 'taskFormMapId': '2808', 'variable': 'var16bbb29a1b4', 'variableValue': this.createJob.value['RelevantExp'] },
        { 'taskFormMapId': '2809', 'variable': 'var16bbb29d187', 'variableValue': this.createJob.value['japaneseRequired'] },
        { 'taskFormMapId': '2810', 'variable': 'var16bbb29d529', 'variableValue': this.createJob.value['japaneseSkillLevel'] },
        { 'taskFormMapId': '2811', 'variable': 'var16bbb29fc63', 'variableValue': this.createJob.value['requirementCount'] },
        { 'taskFormMapId': '2812', 'variable': 'var16bbb29fe78', 'variableValue': this.createJob.value['clientRefId'] },
        {
          'taskFormMapId': '2813', 'variable': 'var16bbb2a490d', 'variableValue':
            this.datepipe.transform(this.createJob.value['possibleCloseDate'], 'dd-MM-yyyy-hh-mm-ss')
        }]
    };
    console.log(formData);
    console.log(JSON.stringify(formData));
    console.log('this is form data');
// tslint:disable-next-line:max-line-length
const formDataDynamic = [this.createJob.value['positionName'], this.createJob.value['clientInfo'], this.createJob.value['clientRefId'], this.getSkills(), this.getAdditionalSkills(),
// tslint:disable-next-line:max-line-length
this.createJob.value['ExpRequired'], this.createJob.value['RelevantExp'], this.createJob.value['japaneseRequired'], this.createJob.value['japaneseSkillLevel'],
// tslint:disable-next-line:max-line-length
this.createJob.value['requirementCount'],  this.datepipe.transform(this.createJob.value['possibleCloseDate'], 'dd-MM-yyyy-hh-mm-ss') ];
console.log(formDataDynamic);

    this.jobService.createPosition(definitionId, priority, name, formDataDynamic);
  }

  getSkills() {
    this.skills_array = [];
    for (let i = 0; i < this.createJob.value['mandatorySkills'].length; i++) {
      this.skills_array.push(this.createJob.value['mandatorySkills'][i].value);
      console.log(this.skills_array);
    }
    return this.skills_array.join();
  }
  getAdditionalSkills() {
    this.additional_skills = [];
    for (let i = 0; i < this.createJob.value['goodToHaveSkills'].length; i++) {
      this.additional_skills.push(this.createJob.value['goodToHaveSkills'][i].value);
      console.log(this.additional_skills);
    }
    return this.additional_skills.join();
  }
  show() {
    if (this.showClientInfo === true) {
      this.showClientInfo = false;
    } else {
      this.showClientInfo = true;
    }

  }
  onLikeRemove(tag) {

    console.log(this.userData);
  }



}

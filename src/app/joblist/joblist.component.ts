import { Component, OnInit, PipeTransform } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';


interface JobDetails {
  position_name: string;
  client_name: string;
  client_reference: string;
  skillset: string;
  experience: number;
  status: number;
  openings: string;
}

const JOBS: JobDetails[] = [
  {
    position_name: 'Core Java Developer',
  client_name: 'Rakuten',
  client_reference: 'RK2916',
  skillset: 'Java, Javascrript, Angular, MySql',
  experience: 5,
  status: 3,
  openings: 'Open'
  },
  {
    position_name: 'Service Now Consultant',
    client_name: 'Philip Moris Japan',
    client_reference: 'PMJ9001',
    skillset: 'ServiceNow, Service Portal, Angular',
    experience: 3,
    status: 2,
    openings: 'Open'
  },
  {
    position_name: 'Project Manager',
    client_name: 'Rakuten',
    client_reference: 'RK2976',
    skillset: 'Project Management, Java, Client-Server',
    experience: 10,
    status: 2,
    openings: 'Open'
  },

];

function search(text: string, pipe: PipeTransform): JobDetails[] {
  return JOBS.filter(job => {
    const term = text.toLowerCase();
    return job.position_name.toLowerCase().includes(term)
        || pipe.transform(job.client_name).includes(term)
        || pipe.transform(job.client_reference).includes(term)
        || pipe.transform(job.skillset).includes(term)
        || pipe.transform(job.experience).includes(term)
        || pipe.transform(job.status).includes(term);
  });
}

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss'],
  animations: [routerTransition()]
})

export class JoblistComponent implements OnInit {
  jobs = JOBS;

  constructor() { }

  ngOnInit() {
  }

}

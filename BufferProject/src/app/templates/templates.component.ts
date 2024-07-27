import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MasterServiceService } from '../services/master-service.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TemplatesComponent implements OnInit{

  constructor(private service : MasterServiceService) {}

  ngOnInit(): void {
  this.getTemplate();
  }

getTemplate(){
  this.service.getTemplate().subscribe(data => {
  data.forEach(element => {
  const template = document.createElement('div');
  template.innerHTML = element.templateContent;
  template.setAttribute('id','template-'+element.templateId);
  template.setAttribute('class','template');
  document.getElementById('templates')?.appendChild(template);
  // document.createElement('br');
});
});
}
}

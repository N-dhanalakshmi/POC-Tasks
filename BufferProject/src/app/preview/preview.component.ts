import { MasterServiceService } from '../services/master-service.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, viewChild } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  encapsulation : ViewEncapsulation.None
})
export class PreviewComponent implements AfterViewInit{

  @ViewChild('preview',{static:false}) preview!: ElementRef;


  constructor(private service : MasterServiceService) {}

  ngAfterViewInit(): void {
      this.service.getContent().subscribe((data:HTMLElement) => {this.preview.nativeElement.appendChild(data.cloneNode(true) as HTMLElement);
        console.log(data.innerHTML.valueOf)});
  }

}

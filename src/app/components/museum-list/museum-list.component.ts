import { Component, OnInit } from '@angular/core';
import { MuseumService } from '../../services/museum.service';
import { NgFor, NgIf } from '@angular/common';



// Class structure definitions
export class Tour {
  tourName: string | undefined;
  tourGuide: string | undefined;
  duration: number | undefined;
}

export class Museum {
  _id: string | undefined;
  name: string | undefined;
  admissionPrice: number | undefined;
  location: string | undefined;
  tours: Tour[] = []; 
}

@Component({
  selector: 'app-museum-list',
  imports: [NgFor, NgIf],
  templateUrl: './museum-list.component.html',
  styleUrl: './museum-list.component.css'
})
export class MuseumListComponent implements OnInit {
  MUSEUMS: any;
  _id: string | undefined;
  name: string | undefined;
  admissionPrice: number | undefined;
  location: string | undefined;
  tours: Tour[] = []; 

  constructor(private service: MuseumService) {}

  getMuseums () {
    this.service.getMuseums().subscribe(response => {
      this.MUSEUMS = response;
    })
  }

  ngOnInit() {
    // Get the cheeses on component init
    this.getMuseums();
  }

}

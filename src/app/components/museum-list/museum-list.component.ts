import { Component, OnInit } from '@angular/core';
import { MuseumService } from '../../services/museum.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';


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
  imports: [NgFor, NgIf, FormsModule, RouterModule],
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

  getMuseums () : void {
    this.service.getMuseums().subscribe(response => {
      this.MUSEUMS = response;
    })
  }

  resetForm(): void {
    this.name = undefined;
    this.admissionPrice = undefined;
    this.location = undefined;
    this.tours = [];
  }

  // A function to get the clicked museum components
  selectMuseum(museum : Museum) {
    this._id = museum._id;
    this.name = museum.name;
    this.admissionPrice = museum.admissionPrice;
    this.location = museum.location;
    this.tours = museum.tours;
  }

  updateMuseum (): void {
    const museum = {
      name: this.name,
      admissionPrice: this.admissionPrice,
      location: this.location,
      tours: this.tours
    };

    // Update the museum and reset the form.
    this.service.updateMuseum(museum).subscribe(response => {
      this.resetForm();
    });

  }

  // A method to delete a museum entry
  delete(_id: string) {
    if (confirm('Are you sure you want to delete this museum?')) {
      this.service.deleteMuseum(_id).subscribe(response => {
        this.getMuseums();
      })
    }
  }

  ngOnInit() {
    // Get the museums on component init
    this.getMuseums();
  }

}

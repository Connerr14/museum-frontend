
import { MuseumService } from '../../services/museum.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-museum',
  imports: [FormsModule, NgFor],
  templateUrl: './add-museum.component.html',
  styleUrl: './add-museum.component.css'
})
export class AddMuseumComponent implements OnInit {
    MUSEUMS: any;
    _id: string | undefined;
    name: string | undefined;
    admissionPrice: number | undefined;
    location: string | undefined;
    tours: Tour[] = []; 

  constructor(private service: MuseumService) {}

    ngOnInit(): void {
      this.addTour();
    }
  

    addTour(): void {
      this.tours.push(new Tour());
    }
  

    removeTour(index: number): void {
      this.tours.splice(index, 1);
    }
  
    submitForm(): void {
      const newMuseum = {
        name: this.name,
        admissionPrice: this.admissionPrice,
        location: this.location,
        tours: this.tours
      };
      console.log('Submitted Museum:', newMuseum);
      this.service.addMuseum(newMuseum).subscribe(response => {
        this.resetForm();
      })
    }

    // A method to reset the form after submission
    resetForm(): void {
      this.name = undefined;
      this.admissionPrice = undefined;
      this.location = undefined;
      this.tours = [];
    }
  }
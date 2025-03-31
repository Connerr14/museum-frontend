
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MuseumService } from '../../services/museum.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';


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
  selector: 'app-edit-museum',
  imports: [FormsModule, NgFor, RouterModule, NgClass],
  templateUrl: './edit-museum.component.html',
  styleUrl: './edit-museum.component.css'
})
export class EditMuseumComponent implements OnInit {
    MUSEUMS: any;
    _id: string | undefined;
    name: string | undefined;
    admissionPrice: number | undefined;
    location: string | undefined;
    tours: Tour[] = []; 
    message: string = "";
    messageClass: string[] = ["alert"];


  constructor(private service: MuseumService, private route: ActivatedRoute) {}

  update () {
    const museum = {
      _id: this._id,
      name: this.name,
      admissionPrice: this.admissionPrice,
      location: this.location,
      tours: this.tours
    };
    
      // Update the museum and reset the form.
      this.service.updateMuseum(museum).subscribe({
        next: response => {
          this.message = "Update Was Saved"
          this.messageClass = ["alert", "alert-success"];
        },
        error: err => {
          this.message = "Error, Please try again later"
          this.messageClass = ["alert", "alert-danger"];
        }
        
      });
  }

  ngOnInit () {
    // Get the id of the museum to edit
    const museumId = this.route.snapshot.paramMap.get('id');
    if (museumId) {
      this.service.getMuseumById(museumId).subscribe(response => {
          this.MUSEUMS = [response];
          this.selectMuseum(this.MUSEUMS[0])
      });
    }
  }

    // A function to get the clicked museum components
    selectMuseum(museum : Museum) {
      this._id = museum._id;
      this.name = museum.name;
      this.admissionPrice = museum.admissionPrice;
      this.location = museum.location;
      this.tours = museum.tours;
    }

};


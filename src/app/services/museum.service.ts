import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  // A method to get all museums
  getMuseums () {
      // Make the api call
      console.log(this.serverUrl);
      return this.http.get(`${this.serverUrl}/museums`);
  }
  
  // A method to add a museum
  addMuseum (museum: any) {
    return this.http.post(`${this.serverUrl}/museums`, museum);
  }

  // A method to delete a museum
  deleteMuseum (_id: string) {
    return this.http.delete(`${this.serverUrl}/museums/${_id}`);
  }

  // A method to update a museum
  updateMuseum (museum: any) {
    return this.http.put(`${this.serverUrl}/museums/${museum._id}`, museum);
  }
}

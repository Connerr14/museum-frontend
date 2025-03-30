import { Routes } from '@angular/router';
import { MuseumListComponent } from './components/museum-list/museum-list.component';
import { HomeComponent } from './components/home/home.component';
import { AddMuseumComponent } from './components/add-museum/add-museum.component';
import { EditMuseumComponent } from './components/edit-museum/edit-museum.component';

export const routes: Routes = [
    // The path for the museum lists page
    {
        path: 'museum', component: MuseumListComponent
    },
    {
        path: "", component: HomeComponent
    },
    {
        path: "addMuseum", component: AddMuseumComponent
    },
    {
        path: "editMuseum", component: EditMuseumComponent
    }
];

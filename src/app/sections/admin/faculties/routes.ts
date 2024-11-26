import { Routes } from "@angular/router";
import { Component } from '@angular/core';
import { FacultyListComponent } from "./components/faculty-list/faculty-list.component";
import { FacultyCreateComponent } from "./components/faculty-create/faculty-create.component";

export const FACULTY_ROUTES: Routes = [
    {
        path: '',
        component: FacultyListComponent
    },
    {
        path: 'create',
        component: FacultyCreateComponent
    }
];

import { Routes } from "@angular/router";
import { Component } from '@angular/core';
import { FacultyListComponent } from "./components/faculty-list/faculty-list.component";
import { FacultyCreateComponent } from "./components/faculty-create/faculty-create.component";
import { FacultyEditComponent } from "./components/faculty-edit/faculty-edit.component";

export const FACULTY_ROUTES: Routes = [
    {
        path: '',
        component: FacultyListComponent
    },
    {
        path: 'create',
        component: FacultyCreateComponent
    },
    {
        path: 'edit/:id',
        component: FacultyEditComponent
    }
];

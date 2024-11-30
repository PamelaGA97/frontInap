import { Routes } from "@angular/router";
import { FacultyCoursesListComponent } from "./components/faculty-courses-list/faculty-courses-list.component";
import { CreateFacultyCoursesComponent } from "./components/create-faculty-courses/create-faculty-courses.component";

export const FACULTY_COURSES_ROUTES: Routes = [
    {
        path: '',
        component: FacultyCoursesListComponent
    },
    {
        path: 'create',
        component: CreateFacultyCoursesComponent
    }
];
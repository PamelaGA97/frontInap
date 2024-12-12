import { Routes } from "@angular/router";
import { FacultyCoursesListComponent } from "./components/faculty-courses-list/faculty-courses-list.component";
import { CreateFacultyCoursesComponent } from "./components/create-faculty-courses/create-faculty-courses.component";
import { FacultyCourseDetailComponent } from "./components/faculty-course-detail/faculty-course-detail.component";

export const FACULTY_COURSES_ROUTES: Routes = [
    {
        path: '',
        component: FacultyCoursesListComponent
    },
    {
        path: 'create',
        component: CreateFacultyCoursesComponent
    },
    {
        path: 'detail/:id',
        component: FacultyCourseDetailComponent  
    }
];
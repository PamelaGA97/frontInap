import { ViewPage } from '../shared/models/view-page.model';
import { environment } from '../../environments/environment';

export const adminPath = '/admin';

export const pages: ViewPage[] = [
    {
        name: 'Home',
        path: `${environment.baseUrl}${adminPath}/`
    },
    {
        name: 'Estudiantes',
        path: `${environment.baseUrl}${adminPath}/students`
    },
    {
        name: 'Secretarias',
        path: `${environment.baseUrl}${adminPath}/secretaries`
    },
    {
        name: 'Docentes',
        path: `${environment.baseUrl}${adminPath}/professors`
    }
]
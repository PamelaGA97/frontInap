import { ViewPage } from '../shared/models/view-page.model';
import { environment } from '../../environments/environment';

export const adminPath = '/admin';

export const pages: ViewPage[] = [
    {
        name: 'Home',
        path: `${environment.baseUrl}${adminPath}/`
    },
    {
        name: 'Usuarios',
        path: `${environment.baseUrl}${adminPath}/users`
    }
]
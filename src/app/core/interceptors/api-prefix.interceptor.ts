import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'

// Environment
import { environment } from '../../../environments/environment'

/**
 * Prefixes all requests with `environment.host`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({ url: environment.apiUrl + request.url })
    
    return next.handle(request)
  }
}

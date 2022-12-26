import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class CustomHttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loaderService.show();

    return next.handle(req)
         .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this._loaderService.hide();
                }
            }, (error) => {
                this._loaderService.hide();
            }));
}
}

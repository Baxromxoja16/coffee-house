import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  const start = Date.now();
  return next(req).pipe(tap({
    next: event => {
      if (event.type === HttpEventType.Response) {
        console.log(
          '⬅️ Res:',
          req.url,
          '⏱', Date.now() - start, 'ms',
          '\nBody:', event.body
        );
      }
    }
  }));

};

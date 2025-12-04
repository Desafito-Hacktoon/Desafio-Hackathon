import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
      req = req.clone({
          setHeaders: { Authorization: `bearer ${token}` }
      });
  }
    return next(req);
};

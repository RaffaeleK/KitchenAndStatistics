import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../enviroments/enviromennt";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token && req.urlWithParams.startsWith(environment.apiKitchen)) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + token)
      });
      return next(cloned);  }
  else {
      return next(req);    
  }
};
import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../enviroments/enviroment";


export const authInterceptor: HttpInterceptorFn = (req, next) => { // Interceptor per aggiungere il token di autenticazione alle richieste HTTP
  const token = localStorage.getItem('token');
  if (token && req.urlWithParams.startsWith(environment.apiKitchen)) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization", // Aggiunge il token di autenticazione all'header della richiesta
              "Bearer " + token)
      });
      return next(cloned);  }
  else {
      return next(req);    
  }
};
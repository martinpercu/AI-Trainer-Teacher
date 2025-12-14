import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RecruiterAuthService } from '@services/recruiter-auth.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(RecruiterAuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map(user => {
      // Chequear si está logueado y tiene el email autorizado
      if (user && user.email === 'martin@martin.com') {
        return true;
      }
      
      // Si no está autorizado, redirigir al login o home
      router.navigate(['/']);
      return false;
    })
  );
};





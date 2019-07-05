import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthProvider } from '../../providers/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth : AuthProvider,
    private router: Router){}

  canActivate(): Promise<boolean> {
    return new Promise(resolve=>{
      this.afAuth.getAuth().onAuthStateChanged(user=>{
        if(!user)this.router.navigate(['login']);
        resolve(user ? true : false);
      })
    });
  }
}
 
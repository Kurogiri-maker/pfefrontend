import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';;
import { inject } from '@angular/core';
import { JwtClientService } from '../../components/auth/login/service/jwt-client.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtClientService: JwtClientService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.jwtClientService.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private jwtClientService: JwtClientService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.jwtClientService.isAdmin();
  }
}


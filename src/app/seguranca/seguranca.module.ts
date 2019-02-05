import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        skipWhenExpired: true
      }
    }),
  ],
})
export class SegurancaModule { }

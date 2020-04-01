import { Component, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { UserSession } from 'blockstack';

const authOptions = {
  redirectTo: '/',
  manifestPath: '/manifest.json',
  authOrigin: 'http://localhost:4200/',
  sendToSignIn: true,
  userSession: new UserSession(),
  appDetails: {
    name: 'BlockSample',
    icon: '',
  },
};

const key = authOptions.userSession.generateAndStoreTransitKey();

@Component({
  selector: 'app-root',
  template: `
    <main>
      <button (click)="buttonClick$.next()">Blockstack Connect</button>
    </main>
  `,
})
export class AppComponent {
  buttonClick$ = new Subject();

  constructor(public zone: NgZone) {}

  ngOnInit() {
    this.buttonClick$.subscribe(() => {
      const authRequest = authOptions.userSession.makeAuthRequest(
        key,
        'http://localhost:4200',
        'http://localhost:4200/manifest.json',
        ['scope_write'],
        'https://localhost:4200'
      );
      authOptions.userSession.redirectToSignInWithAuthRequest(authRequest);
    });
  }
}

import { Component } from '@angular/core';
import { Subject } from 'rxjs';
// import { showBlockstackConnect } from '@blockstack/connect';

import { UserSession } from 'blockstack';

const authOptions = {
  redirectTo: '/',
  manifestPath: '/manifest.json',
  sendToSignIn: true,
  userSession: new UserSession(),
  appDetails: {
    name: 'BlockExample',
    icon: 'http://placekitten.com/g/100/100',
  },
};

const legacyBrowserAuthFlow = () => {
  const key = authOptions.userSession.generateAndStoreTransitKey();
  const authRequest = authOptions.userSession.makeAuthRequest(
    key,
    'http://localhost:4200',
    'http://localhost:4200/manifest.json',
    ['scope_write'],
    'https://localhost:4200'
  );
  authOptions.userSession.redirectToSignInWithAuthRequest(authRequest);
};

const loadBlockstackConnectWithGlobal = () => {
  (window as any).blockstackConnect.showBlockstackConnect(authOptions);
};

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

  ngOnInit() {
    this.buttonClick$.subscribe(() => loadBlockstackConnectWithGlobal());
  }
}

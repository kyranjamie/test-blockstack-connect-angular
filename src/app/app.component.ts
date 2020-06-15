import { Component } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserSession } from 'blockstack';
import { AuthOptions, FinishedData } from '@blockstack/connect';

@Component({
  selector: 'app-root',
  template: `
    <main style="margin: 100px auto; max-width: 960px;">
      <h3>Open Blockstack Connect</h3>
      <button (click)="blockstackAuthButtonClick$.next()">{{ buttonText$ | async }}</button>
      <ng-container *ngIf="authResponse$ | async as authResponse">
        <h3>Auth response</h3>
        <code>
          <pre>{{ authResponse | json }}</pre>
        </code>
      </ng-container>
    </main>
  `,
})
export class AppComponent {
  buttonText$ = new BehaviorSubject('Auth with Blockstack');

  blockstackAuthButtonClick$ = new Subject<void>();
  authResponse$ = new ReplaySubject<FinishedData>(1);

  authOptions: AuthOptions = {
    redirectTo: '/',
    manifestPath: '/manifest.json',
    sendToSignIn: true,
    finished: response => this.authResponse$.next(response),
    userSession: new UserSession(),
    appDetails: {
      name: 'BlockExample',
      icon: 'http://placekitten.com/g/100/100',
    },
  };

  ngOnInit() {
    this.blockstackAuthButtonClick$
      .pipe(
        tap(() => this.buttonText$.next('Loading')),
        switchMap(() => import('@blockstack/connect')),
        tap(() => this.buttonText$.next('Auth with Blockstack'))
      )
      .subscribe(connectLibrary => connectLibrary.showBlockstackConnect(this.authOptions));
  }
}

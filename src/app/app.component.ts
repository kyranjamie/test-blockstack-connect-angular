import { Component, NgZone } from "@angular/core";
import { Subject } from "rxjs";

import { UserSession } from "blockstack";

const authOptions = {
  redirectTo: "/",
  manifestPath: "/manifest.json",
  authOrigin: "http://localhost:4200/",
  sendToSignIn: true,
  userSession: new UserSession(),
  appDetails: {
    name: "BlockSample",
    icon: ''
  }
};

@Component({
  selector: "app-root",
  template: `
    <main>
      <button (click)="buttonClick$.next()">Blockstack Connect</button>
    </main>
  `
})
export class AppComponent {
  buttonClick$ = new Subject();

  constructor(public zone: NgZone) {}

  ngOnInit() {
    this.buttonClick$.subscribe(() => {
      console.log("button clicked");
    });
  }
}

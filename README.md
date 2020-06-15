# Blockstack with Angular 9

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Notes

This project demonstrates some of the steps you'll need to take to get Blockstack running with an Angular application.

We're looking to improve our framework compatibility, so all frameworks work right out the box. Right now, there are a few workarounds needed. They're not ideal, but we're working to fix them. You can [follow along in this issue](https://github.com/blockstack/blockstack.js/issues/751).

For the time being, try these steps can help:

### 1. Polyfill empty objects

Add this block to your `polyfill.ts` file:

```typescript
(window as any).global = window;
global.Buffer = require('buffer').Buffer;
(window as any).process = {
  version: '',
  env: {}
};
```

This is required as a dependency of `@blockstack/connect`, blockstack.js, depends on some node.js packages.

### 2. Polyfill `stream`

Similar to above, we need to avoid the dependency on node's `stream` package. Install `readable-stream` and add the following to your `tsconfig.app.json` file.

```
npm i --save readable-stream
```

```json
  "compilerOptions": {
    "paths": {
      "stream": ["./node_modules/readable-stream"]
    }
  },
```

### 3. Utilise package

#### Option 1

Add the package to your `index.html` rather than importing directly in your compoent.

```
<script src="https://unpkg.com/@blockstack/connect"></script>
```

#### Option 2

Import bundle dynamically using `import()`. This creates a separate bundle with the additional assets, which can be loaded in background as to not slow your initial load.

Install the peer depenencies of connect:

```
npm i --save react react-dom styled-components
```

Here, we're using an Rxjs `switchMap` on the `buttonClick$` event to invoke the `import` Promise, but you could just as well utilise it directly in a handler, or in your `ngOnInit` event.

```typescript
this.buttonClick$.pipe(
  tap(() => this.buttonText$.next('Loading')),
  switchMap(() => import('@blockstack/connect')),
  tap(() => this.buttonText$.next('Open Blockstack Connect')),
)
.subscribe(connectLibrary => {
  connectLibrary.showBlockstackConnect(authOptions)
});
```

[See the component file to see how this is implemented.](./src/app/app.component.ts)

## Demo

![Signin demo](./angular-connect-demo.gif)
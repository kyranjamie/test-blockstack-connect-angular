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

### 3. Use the package globally

Add the package to your `index.html` rather than importing directly in your compoent. This mitigates some unresolved typing issues.

```
<script src="https://unpkg.com/@blockstack/connect"></script>
```

[See the component file to see how this is implemented.](./src/app/app.component.ts)
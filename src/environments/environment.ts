// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyCOD4CHzKUBN1XDV15yv20CD4GfRm9h65s",
    authDomain: "web-game-fc8f9.firebaseapp.com",
    databaseURL: "https://web-game-fc8f9.firebaseio.com",
    projectId: "web-game-fc8f9",
    storageBucket: "web-game-fc8f9.appspot.com",
    messagingSenderId: "264869153851"
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

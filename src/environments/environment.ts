// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {  
  firebaseConfig : {
    apiKey: "AIzaSyDvw78bgWNKm7cAKe4i1HHuQIN_atsRSbU",
    authDomain: "herogamesofkau.firebaseapp.com",
    projectId: "herogamesofkau",
    storageBucket: "herogamesofkau.appspot.com",
    messagingSenderId: "457935313208",
    appId: "1:457935313208:web:ff61bd8c7745a120e649cd"
  },
  production: false,
  apiUrl:'http://localhost:8080/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

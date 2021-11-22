// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  emailChangePassUrl: 'http://localhost:8282/auth/emailChangePassword',
  changePassUrl: 'http://localhost:8282/auth/changePassword',
  base: 'http://localhost:8282/',
  s3url: 'https://vapaistorage.s3.sa-east-1.amazonaws.com',
  baseauth: 'http://localhost:8282/auth/',
  baseadmin: 'http://localhost:8282/admin/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

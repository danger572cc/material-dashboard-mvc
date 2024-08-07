import { NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule).then((ref) => {
  if (((window as { [key: string]: any; })["ngRef"] as NgModuleRef<AppModule>)) {
    ((window as { [key: string]: any; })["ngRef"] as NgModuleRef<AppModule>).destroy();
  }
  ((window as { [key: string]: any; })["ngRef"] as NgModuleRef<AppModule>) = ref;
})
  .catch(err => console.error(err));

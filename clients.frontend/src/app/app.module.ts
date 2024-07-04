import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { GlobalErrorHandler } from './services/global-error-handler';
import { ClientDataDirective } from './directives/client-data.directive';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PhonePipe } from "./pipes/phone.pipe";

@NgModule({
    declarations: [AppComponent, ClientDataDirective],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        PhonePipe
    ]
})
export class AppModule {}

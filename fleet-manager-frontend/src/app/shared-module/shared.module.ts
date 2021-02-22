import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material.module";
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {FuseConfirmDialogModule} from "../../../@fuse/components";
import {BaseLayoutModule} from "../base-layout/base-layout.module";
import {AngularFontAwesomeModule} from "angular-font-awesome";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FuseSharedModule,
        BaseLayoutModule,
        FuseConfirmDialogModule,
        AngularFontAwesomeModule
    ],
    exports: [
        MaterialModule,
        FuseSharedModule,
        BaseLayoutModule,
        FuseConfirmDialogModule,
        AngularFontAwesomeModule
    ],
    declarations: [
    ]
})
export class SharedModule {
}

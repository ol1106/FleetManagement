import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { MaterialModule } from "../material.module";
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from "../../../@fuse/components";
import { VerticalLayout1Module } from "./vertical/layout-1/layout-1.module";
import { VerticalLayout2Module } from "./vertical/layout-2/layout-2.module";
import { VerticalLayout3Module } from "./vertical/layout-3/layout-3.module";
import { HorizontalLayout1Module } from "./horizontal/layout-1/layout-1.module";
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TimeDisplayerModule } from './components/time-displayer/time-displayer.module';

@NgModule({
    declarations: [
        LayoutComponent,
         NotificationsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FuseThemeOptionsModule,
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        FuseProgressBarModule,
        FuseSidebarModule,
        TimeDisplayerModule
    ],
    exports: [
        LayoutComponent,
        FuseThemeOptionsModule,
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        FuseProgressBarModule,
        FuseSidebarModule,
        TimeDisplayerModule
    ],
    entryComponents: [
        NotificationsComponent
    ]
})
export class BaseLayoutModule {
}

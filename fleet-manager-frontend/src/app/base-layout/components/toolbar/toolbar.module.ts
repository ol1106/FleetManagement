import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSearchBarModule, FuseShortcutsModule } from '../../../../../@fuse/components/index';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';

import { ToolbarComponent } from './toolbar.component';
import {MaterialModule} from "../../../material.module";
import {QuickPanelModule} from "../quick-panel/quick-panel.module";
import {TimeDisplayerModule} from "../time-displayer/time-displayer.module";

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MaterialModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        QuickPanelModule,
        TimeDisplayerModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}

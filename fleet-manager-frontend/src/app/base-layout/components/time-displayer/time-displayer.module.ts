import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../../material.module";
import {TimeDisplayerComponent} from "./time-displayer.component";

@NgModule({
  declarations: [TimeDisplayerComponent],
  imports: [
    CommonModule,
      MaterialModule
  ],
    exports: [
        TimeDisplayerComponent
    ]
})
export class TimeDisplayerModule { }

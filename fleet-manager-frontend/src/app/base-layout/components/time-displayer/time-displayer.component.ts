import {Component, OnInit} from '@angular/core';
import {TimeDisplayerService} from "./time-displayer.service";

@Component({
    selector: 'time-displayer',
    templateUrl: './time-displayer.component.html',
    styleUrls: ['./time-displayer.component.scss'],
})
export class TimeDisplayerComponent implements OnInit {

    constructor(public timeService: TimeDisplayerService) {
    }

    ngOnInit() {
        this.timeService.setTimeOutTimeUpdate();
    }


}

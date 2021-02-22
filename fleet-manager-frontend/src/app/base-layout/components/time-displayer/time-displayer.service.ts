import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimeDisplayerService {

    timeEmitter: BehaviorSubject<Date> = new BehaviorSubject(new Date());
    currentTime: Date = new Date();

    constructor() {
    }

    setTimeOutTimeUpdate() {
        setInterval(() => {
            this.currentTime = new Date();
            this.timeEmitter.next(this.currentTime);
        }, 1000)
    }

}

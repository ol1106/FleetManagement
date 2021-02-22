import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

import {FuseConfigService} from '../../../../../@fuse/services/config.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';

import {navigation} from '../../../fuse-config/navigation';
import {MatDialog, MatDialogRef} from "@angular/material";
import {NotificationsComponent} from "../notifications/notifications.component";
import {DOCUMENT} from "@angular/common";
import { TokenStorageService } from '../../../_services/token-storage.service';
import { User } from '../../../models/user';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    isLoggedIn:boolean=false;
    user:User;
    name:String;
    roles:string[];

    @ViewChild('notificationButton') notificationButton: ElementRef;

    notificationRef: MatDialogRef<NotificationsComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;
    public theme: string;
    showProfile=true;

    /**
     * Constructor
     *
     * @param document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     * @param _dialog
     */
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _dialog: MatDialog,
        private tokenStorage: TokenStorageService
    ) {
        this.navigation = navigation;
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     *
     * return sidebar folded status
     *
     */
    get isSidebarFolded(): boolean {
        const navbar = this._fuseSidebarService.getSidebar('navbar');
        return navbar ? navbar.folded : true;
    }

    /**
     *
     * return sidebar opened status
     *
     */
    get isSidebarOpened(): boolean {
        const navbar = this._fuseSidebarService.getSidebar('navbar');
        return navbar ? navbar.opened : false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
      if (this.isLoggedIn) {
        this.user = this.tokenStorage.getUser();
        this.name = this.user.username;
        this.roles=this.user.roles;
        if(this.roles.includes("ADMIN") || this.roles.includes("COMPANY")){
            this.showProfile=false;
        }
      }

      
        // Subscribe to the config changes
        // this.setTimeOutTimeUpdate();

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
                this.theme = settings.colorTheme;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});
    }

    logout(): void {
        this.tokenStorage.signOut();
        window.location.reload();
      }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpened(): void {
        if(!this._fuseSidebarService.getSidebar("navbar")) {
            this._fuseConfigService.getConfig()
                .pipe(
                    take(1)
                )
                .subscribe(
                    e => {
                        e.layout.navbar.hidden = false;
                        e.layout.navbar.folded = false;
                        this._fuseConfigService.setConfig(e, {emitEvent: true});
                    }
                );
            return ;
        }
        this._fuseSidebarService.getSidebar("navbar").toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     *
     * create notifications modal
     *
     */
    loadNotifications() {
        if (this.notificationRef && this.notificationRef.componentInstance) {
            this.notificationRef.close();
            this.notificationRef = null;
            return;
        }
        this.notificationRef = this._dialog.open(NotificationsComponent, {
            hasBackdrop: true,
            position: {
                top: `${this.notificationButton.nativeElement.offsetHeight + 10}px`,
                right: `${this._getPositionRight()}px`
            },
            backdropClass: 'backdrop-hidden',
            panelClass: 'notifications-dialog'
        })
    }

    private _getPositionRight(): number {
        return this.document.body.clientWidth > 600 ? this.document.body.clientWidth -
            (this.document.body.clientWidth -
                this.document.body.getElementsByTagName('toolbar')[0].clientWidth) -
            this.notificationButton.nativeElement.offsetLeft -
            this.notificationButton.nativeElement.offsetWidth : 20;
    }

}

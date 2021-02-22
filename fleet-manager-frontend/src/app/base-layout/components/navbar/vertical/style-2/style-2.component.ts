import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '../../../../../../../@fuse/services/config.service';
import {FuseNavigationService} from '../../../../../../../@fuse/components/navigation/navigation.service';
import {FusePerfectScrollbarDirective} from '../../../../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '../../../../../../../@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'navbar-vertical-style-2',
    templateUrl: './style-2.component.html',
    styleUrls: ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective)
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if (activeNavItem) {
                            const activeItemOffsetTop = activeNavItem.offsetTop,
                                activeItemOffsetParentTop = activeNavItem.offsetParent ? activeNavItem.offsetParent.offsetTop : '',
                                scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3);

                            this._fusePerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check sidebar folded status
     */
    get isSidebarFolded(): boolean {
        const navbar = this._fuseSidebarService.getSidebar('navbar');
        return navbar ? navbar.folded : true;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if (this._fuseSidebarService.getSidebar('navbar')) {
                        this._fuseSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        const navbar = this._fuseSidebarService.getSidebar('navbar');
        navbar ? navbar.toggleOpen() : null;
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        const navbar = this._fuseSidebarService.getSidebar('navbar');
        navbar ? navbar.toggleFold() : true;
    }
}

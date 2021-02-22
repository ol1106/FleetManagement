import { FuseNavigation } from '../../../@fuse/types';

export const navigation: FuseNavigation[] = [

    {
        id: 'home',
        title: 'Home',
        translate: 'Home',
        type: 'item',
        icon: 'home',
        url: '/'
    },
    {
        id: 'fleet',
        title: 'Fleet',
        translate: 'Fleet',
        type: 'item',
        icon: 'directions_car',
        url: 'fleet'
    },
    {
        id: 'company',
        title: 'Company',
        translate: 'Company',
        icon:"business",
        type: "collapsable",

        children: [{
            id: 'addCompany',
            title: 'Add company',
            translate: 'Add company',
            type: "item",
            icon:"add",
            url:"addCompany"
        },
        {
            id: 'Company',
            title: 'Company',
            translate: 'Company',
            type: "item",
            icon:"business",
            url:"company"
        }]
    },
    {
        id: 'driver',
        title: 'Drivers',
        translate: 'Drivers',
        icon: "person",
        type: "collapsable",
        children: [{
            id: 'addDriver',
            title: 'Add driver',
            translate: 'Add driver',
            type: "item",
            icon: "person_add",
            url:"addDriver"
        },
        {
            id: 'allDrivers',
            title: 'All drivers',
            translate: 'All drivers',
            type: "item",
            icon: "groups",
            url:"drivers"
        }]
    },
    {
        id: 'services',
        title: 'Services',
        translate: 'Services',
        icon: "build",
        type: "collapsable",
        children: [{
            id: 'service',
            title: 'Add Service',
            translate: 'Add Service',
            type: "item",
            icon: "control_point",
            url:"vehicleService"
        },
        {
            id: 'allServices',
            title: 'All services',
            translate: 'All services',
            type: "item",
            icon: "build",
            url:"vehicleServiceList"
        }]
    },
    {
        id: 'issues',
        title: 'Issues',
        translate: 'Issues',
        icon: "report_problem",
        type: "collapsable",
        children: [{
            id: 'issues',
            title: 'Add Issue',
            translate: 'Add Issue',
            type: "item",
            icon: "control_point",
            url:"vehicleIssue"
        },
        {
            id: 'allIssues',
            title: 'All issues',
            translate: 'All issues',
            type: "item",
            icon: "report_problem",
            url:"vehicleIssueList"
        }]
    }
];

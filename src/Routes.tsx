import { RouteObject, Navigate } from 'react-router'
import Login from './components/Auth/Login'
import AuthGuard from './Services/AuthGuard'
import ForgotPassword from './components/Auth/ForgotPassword'
import GridDashboard from './Dashboards/GridDashboard'
import Layout from './components/Layouts/Layout'
import MainDashboard from './Dashboards/MainDashboard'
import PlantViewDashboard from './Dashboards/PlantViewDashboard'
import DGDashboard from './Dashboards/DGDashboard'
import BESS_OverviewDashboard from './Dashboards/BESS_OverviewDashboard'
import BESS_KPIDashboard from './Dashboards/BESS_KPIDashboard'
import BESS_HealthDashboard from './Dashboards/BESS_HealthDashboard'
import InverterDashboard from './Dashboards/InverterDashboard'
import AlarmDashboard from './Dashboards/AlarmDashboard'
import DataExporterDashboard from './Dashboards/DataExporterDashboard'
import DeviceOverviewDashboard from './Dashboards/DeviceOverviewDashboard'
import PlantAlarmDashboard from './Dashboards/PlantAlarmDashboard'
import ReportTemplate from './Dashboards/ReportTemplates'
import { Box } from '@chakra-ui/react'
import AnalyticsDashboard from './Dashboards/AnalyticsDashboard'
import NotFoundPage from './pages/NotFoundPage'
import TenantView from './pages/TenantView'
import MUIThemeProvider from './styles/MUIThemeProvider'
import MeterDashboard from './Dashboards/MeterDashboard'
import WMSDashboard from './Dashboards/WMSDashboard'
import PlantInfoForm from './components/ConfigPages/PlantInfoForm'
import InverterStringDashboard from './Dashboards/InverterStringDashboard'
import SmbStringDashboard from './Dashboards/SmbStringDashboard'
import CreateReport from './Dashboards/CreateReport'
import SavedReport from './Dashboards/SavedReport'
import AlarmProfileRule from './components/widgets/PageWidgets/DeviceAlarmProfileRule/AlarmProfileRule'
import CatalogDashboardLayout from './components/Layouts/CatalogDashboardLayout'

const indexDashboard = localStorage.getItem("indexDashboard") as string;

const Routes : RouteObject[] = [
    {
        path: '*',
        element: (
            <Layout>
                <NotFoundPage />
            </Layout>
        )
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/tenant',
        element : (
            <AuthGuard>
                <Layout 
                    breadcrumbs={
                        [
                            {
                                title : 'Home',
                                to : '',
                                color : ''
                            },
                            {
                                title : 'Tenant View',
                                to : '/tenant',
                                color : ""
                            },
                            {
                                title : 'Main',
                                to : '/tenant',
                                color : "#062D59"
                            }
                        ]
                    }
                >
                    <MUIThemeProvider>
                        <TenantView />
                    </MUIThemeProvider>
                </Layout>
            </AuthGuard>
        )
    },
    {   
        index : true,
        path : '/',
        element : (
            <AuthGuard>
                <Navigate to={ indexDashboard } replace />
            </AuthGuard>
        )
    },
    {
        path: '/portfolio',
        element: (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Portfolio",
                              to : "/portfolio",
                              color : ""
                            },
                            {
                              title : "Dashboard",
                              to : "/portfolio",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <MainDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/forgotPassword',
        element : <ForgotPassword />
    },
    {
        path : '/energymeter',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "Energy Meter",
                              to : "/energymeter",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <GridDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/othermeter',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "Energy Meter",
                              to : "/othermeter",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <MeterDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/plantview',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "Plant View",
                              to : "/plantview",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <PlantViewDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/analytics/custom',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tool",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Analytics",
                              to : "/analytics/custom",
                              color : ""
                            },
                            {
                              title : "Custom",
                              to : "/analytics/custom",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <AnalyticsDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/analytics/catalogs',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tool",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Analytics",
                              to : "/analytics/custom",
                              color : ""
                            },
                            {
                              title : "Catalogs",
                              to : "/analytics/catalogs",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <CatalogDashboardLayout />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/plantalarm',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "Alarms",
                              to : "/plantalarm",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <PlantAlarmDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/dg',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "DG",
                              to : "/dg",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <DGDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/inverter',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "Inverter",
                              to : "/inverter",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <InverterDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/string',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "String",
                              to : "/string",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <InverterStringDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/smb',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "SMB",
                              to : "/smb",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <SmbStringDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/wms',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "WMS",
                              to : "/wms",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <WMSDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/bess/overview',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                                title : "BESS",
                                to : "/bess/overview",
                                color : ""
                            },
                            {
                              title : "Overview",
                              to : "/bess/overview",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <BESS_OverviewDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/bess/kpi',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                                title : "BESS",
                                to : "/bess/overview",
                                color : ""
                            },
                            {
                              title : "KPI",
                              to : "/bess/kpi",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <BESS_KPIDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/bess/health',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                                title : "BESS",
                                to : "/bess/overview",
                                color : ""
                            },
                            {
                              title : "Health",
                              to : "/bess/health",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <BESS_HealthDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/alarm',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Portfolio",
                              to : "/portfolio",
                              color : ""
                            },
                            {
                              title : "Alarms",
                              to : "/alarm",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <AlarmDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/overview',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Sites",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Assets",
                              to : "/plantview",
                              color : ""
                            },
                            {
                              title : "Overview",
                              to : "/overview",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <DeviceOverviewDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    // {
    //     path : '/dataexport',
    //     element : (
    //         <AuthGuard>
    //             <Layout
    //                 breadcrumbs={
    //                     [
    //                         {
    //                           title : "Home",
    //                           to : "",
    //                           color : ""
    //                         },
    //                         {
    //                           title : "Tools",
    //                           to : "/report",
    //                           color : ""
    //                         },
    //                         {
    //                           title : "Data Export",
    //                           to : "/dataexport",
    //                           color : "#062D59"
    //                         }
    //                     ]
    //                 }
    //             >
    //                 <DataExporterDashboard />
    //             </Layout>
    //         </AuthGuard>
    //     )
    // },
    {
        path : '/report',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tools",
                              to : "/report",
                              color : ""
                            },
                            {
                              title : "Reports",
                              to : "/report",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <ReportTemplate />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/createreport',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tools",
                              to : "/report",
                              color : ""
                            },
                            {
                              title : "Create Report",
                              to : "/createreport",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <CreateReport />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/savedreport',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tools",
                              to : "/report",
                              color : ""
                            },
                            {
                              title : "Saved Report",
                              to : "/savedreport",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <SavedReport />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/plantInfo',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tenant View",
                              to : "/tenant",
                              color : "#062D59"
                            },
                            {
                              title : "Config",
                              to : "/plantInfo",
                              color : ""
                            },
                            {
                              title : "Plant Info",
                              to : "/plantInfo",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <PlantInfoForm />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/alarmProfileRule',
        element : (
            <AuthGuard>
                <Layout
                    breadcrumbs={
                        [
                            {
                              title : "Home",
                              to : "",
                              color : ""
                            },
                            {
                              title : "Tenant View",
                              to : "/tenant",
                              color : "#062D59"
                            },
                            {
                              title : "Config",
                              to : "/plantInfo",
                              color : ""
                            },
                            {
                              title : "Plant Info",
                              to : "/alarmProfileRule",
                              color : "#062D59"
                            }
                        ]
                    }
                >
                    <AlarmProfileRule />
                </Layout>
            </AuthGuard>
        )
    }
]

export default Routes
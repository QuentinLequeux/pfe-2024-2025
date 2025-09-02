import AppLogo from './app-logo';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { NavFooter } from '@/components/nav-footer';
import { Figma, FilesIcon, Github, HeartHandshakeIcon, HouseIcon, PawPrintIcon, WarehouseIcon } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

const mainNavItems: NavItem[] = [
    {
        title: 'Accueil',
        url: '/dashboard',
        icon: HouseIcon,
    },
    {
        title: 'Animaux',
        url: '/animals',
        icon: PawPrintIcon,
    },
    {
        title: 'Parrainage',
        url: '/sponsorship',
        icon: HeartHandshakeIcon,
    },
    {
        title: 'Refuges',
        url: '/organizations',
        icon: WarehouseIcon,
    },
    {
        title: 'Documents',
        url: '',
        icon: FilesIcon,
        soon: true
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository GitHub',
        url: 'https://github.com/QuentinLequeux/pfe-2024-2025',
        icon: Github,
    },
    {
        title: 'Figma',
        url: 'https://www.figma.com/design/k4GQdQRxoMI2b99lBXuLzy/PFE?node-id=0-1&p=f&t=4U7ZkIwnRgJcLSkT-0',
        icon: Figma,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

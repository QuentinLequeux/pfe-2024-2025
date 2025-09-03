import { type NavItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Link, usePage } from '@inertiajs/react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

type User = {
    name: string;
    roles: string[];
};

type Auth = {
    user: User | null;
};

type PageProps = {
    auth: Auth;
};

type NavItemWithRoles = NavItem & {
    roles?: string[];
};


export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage<PageProps>();
    const userRoles: string[] = page.props.auth.user?.roles ?? [];

    const filteredItems = items.filter((item: NavItemWithRoles) => {
        if (!item.roles) return true;
        return userRoles.some(role => item.roles!.includes(role));
    });

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {filteredItems.map((item) =>
                    item.soon ? (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === page.url} className={'cursor-not-allowed'}>
                                <div>
                                    {item.icon && <item.icon />}
                                    <span className={'text-neutral-500'}>{item.title}</span>
                                    <Badge className={'bg-main text-[#000]'}>Bientôt</Badge>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === page.url}>
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon className={item.url === page.url ? 'text-main' : 'text-black dark:text-white'} />}
                                    <span className={item.url === page.url ? 'text-main' : 'text-black dark:text-white'}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

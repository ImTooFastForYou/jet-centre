'use client';

import * as React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LogoBird } from '@/components/logo/logo';

export function SidebarLogo() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex space-x-main">
                    <LogoBird />
                    <div className="flex flex-col items-center">
                        <h1 className="font-semibold text-lg">JET&nbsp;CENTRE</h1>
                        <p className="text-sm text-muted-foreground">Telecom Etude</p>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

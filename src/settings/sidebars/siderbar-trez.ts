import * as React from 'react';

import { FaHouse } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';

type SideBarItem = {
    title: string;
    href: string;
    icon: IconType;
};

export type SideBarGroups = {
    title: string;
    items: SideBarItem[];
};

export const sidebar_trez: SideBarGroups[] = [
    {
        title: 'default',
        items: [
            {
                title: 'disponibilités',
                icon: FaHouse,
                href: '/'
            }
        ]
    }
];

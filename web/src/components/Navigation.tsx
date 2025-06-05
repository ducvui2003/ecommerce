'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { uuid } from '@/lib/utils';
import Link from 'next/link';
import React, { useRef } from 'react';

type NavigationLinkType = {
  title: string;
  href: string;
  description?: string;
};

type NavigationType = {
  title: string;
  href?: string;
  child?: NavigationLinkType[];
};
export const components: NavigationType[] = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  {
    title: 'Sản phẩm',
    href: '/product',
    child: [
      {
        title: 'Tinh dầu',
        href: '/product?categoryName=Tinh+d%E1%BA%A7u',
      },
      {
        title: 'Lọ đựng tinh dầu',
        href: '/product?categoryName=L%E1%BB%8D+%C4%91%E1%BB%B1ng+tinh+d%E1%BA%A7u',
      },
      {
        title: 'Máy xông tinh dầu',
        href: '/product?categoryName=M%C3%A1y+x%C3%B4ng+tinh+d%E1%BA%A7u',
      },
    ],
  },

  {
    title: 'Về chúng tôi',
    href: '/about',
  },
  {
    title: 'Liên hệ',
    href: '/contact',
  },
  {
    title: 'Tư vấn',
    href: '/consultant',
  },
];

type NavigationProps = {
  components: NavigationType[];
};

const Navigation = ({ components }: NavigationProps) => {
  const triggerRef = useRef<HTMLButtonElement[]>([]);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-6 font-medium">
        {components.map((component, index) => {
          return (
            <NavigationMenuItem key={uuid()}>
              {!component.child ? (
                <Link href={component.href!} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={(navigationMenuTriggerStyle(),'text-lg hover:text-primary mx-2')}
                  >
                    {component.title}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <React.Fragment key={uuid()}>
                  <NavigationMenuTrigger
                    className="text-lg data-[state=open]:hover:text-primary data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent focus:bg-transparent hover:bg-transparent p-0"
                    ref={(ref) => {
                      if (ref) {
                        triggerRef.current[index] = ref;
                      }
                    }}
                  >
                    {component.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {component.child.map((item, index) => {
                        return (
                          <li key={index}>
                            <Link href={item.href} legacyBehavior passHref>
                              <NavigationMenuLink className={(navigationMenuTriggerStyle(), 'text-base hover:text-primary mx-2')}>
                                {item.title}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </React.Fragment>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;

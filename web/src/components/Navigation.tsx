'use client';
import Link from '@/components/Link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import React, { useEffect, useRef } from 'react';

type NavigationLinkType = {
  title: string;
  href: string;
  description?: string;
};

type NavigationType = {
  title: string;
  href: string;
  child?: NavigationLinkType[];
};
export const components: NavigationType[] = [
  {
    title: 'Trang chủ',
    href: '/login',
  },
  {
    title: 'Tinh dầu',
    href: '/',
    child: [
      {
        title: 'Tinh dầu',
        href: '/',
      },
      {
        title: 'Tinh dầu',
        href: '/',
      },
    ],
  },
  {
    title: 'Về chúng tôi',
    href: '/',
    child: [
      {
        title: 'Tinh dầu',
        href: '/',
      },
      {
        title: 'Tinh dầu',
        href: '/',
      },
    ],
  },
  {
    title: 'Tư vấn',
    href: '/',
  },
];

type NavigationProps = {
  components: NavigationType[];
};

const Navigation = ({ components }: NavigationProps) => {
  const triggerRef = useRef<HTMLButtonElement[]>([]);
  const viewPortRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('viewPortRef', viewPortRef.current);
    console.log('navRefs', triggerRef.current);
  }, [triggerRef.current, viewPortRef.current]);
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        {components.map((component, index) => {
          return (
            <NavigationMenuItem>
              {!component.child ? (
                <Link href={component.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {component.title}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <>
                  <NavigationMenuTrigger
                    ref={(ref) => {
                      if (ref) {
                        triggerRef.current[index] = ref;
                      }
                    }}
                  >
                    {component.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {component.child.map((item) => {
                      return (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      );
                    })}
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;

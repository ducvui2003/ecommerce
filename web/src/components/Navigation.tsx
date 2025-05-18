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
} from '@/components/ui/navigation-menu';
import { uuid } from '@/lib/utils';
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
    title: 'Sản phẩm',
    href: '/product',
  },

  {
    title: 'Về chúng tôi',
    href: '/about',
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
  // useEffect(() => {
  //   console.log('viewPortRef', viewPortRef.current);
  //   console.log('navRefs', triggerRef.current);
  // }, [triggerRef.current, viewPortRef.current]);
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="gap-10">
        {components.map((component, index) => {
          return (
            <NavigationMenuItem key={uuid()}>
              {!component.child ? (
                <Link href={component.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      (navigationMenuTriggerStyle(), 'px-4 py-2 text-xl')
                    }
                  >
                    {component.title}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <React.Fragment key={uuid()}>
                  <NavigationMenuTrigger
                    className="text-xl"
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
                            className={
                              (navigationMenuTriggerStyle(), 'text-xl')
                            }
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      );
                    })}
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

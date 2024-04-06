/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LeftMenu() {
  const [currentNavItem, setCurrentNavItem] = useState(0);

  // Add this code to update currentNavItem based on active link
  useEffect(() => {
    const pathname = window.location.pathname;
    const activeNavItem = navigation.findIndex(
      (item) => item.href === pathname
    );
    if (activeNavItem !== -1) {
      setCurrentNavItem(activeNavItem);
    }
  }, []);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      count: '5',
      current: currentNavItem === 0,
    },
    {
      name: 'Category',
      href: '/category',
      icon: FolderIcon,
      count: '12',
      current: currentNavItem === 1,
    },
    {
      name: 'Products',
      href: '/products',
      icon: UsersIcon,
      current: currentNavItem === 2,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: CalendarIcon,
      count: '20+',
      current: currentNavItem === 3,
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: DocumentDuplicateIcon,
      current: currentNavItem === 4,
    },
    {
      name: 'Reports',
      href: '#',
      icon: ChartPieIcon,
      current: currentNavItem === 5,
    },
  ];
  const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
  ];
  return (
    <div className="flex grow flex-col min-h-screen gap-y-5 overflow-y-auto bg-black px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setCurrentNavItem(index)}
                  className={classNames(
                    item.current
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-white'
                        : 'text-indigo-200 group-hover:text-white',
                      'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.count ? (
                    <span
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-indigo-200">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <Link
                    to={team.href}
                    className={classNames(
                      team.current
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
            >
              <img
                className="h-8 w-8 rounded-full bg-indigo-700"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/* eslint-disable */
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onLogout } from '../features/auth/authSlice';

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
  const dispatch = useDispatch(); 
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const activeNavItem = navigation.findIndex(
      (item) => pathname.startsWith(item.href) && (item.href === '/' ? pathname === '/' : true)
    );
    if (activeNavItem !== -1) {
      setCurrentNavItem(activeNavItem);
    }
  }, [location]); // React to changes in location

  const handleLogout = () => {
    dispatch(onLogout());
    localStorage.setItem('token', '');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
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
      href: '/product',
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
      name: 'Document',
      href: '/document',
      icon: DocumentDuplicateIcon,
      current: currentNavItem === 4,
    },
    {
      name: 'Category Details',
      href: '/category/details',
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
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/'}                  
                  onClick={() => setCurrentNavItem(index)}
                  className={classNames(
                    item.current
                      ? 'bg-red-400 text-white'
                      : 'text-indigo-200 hover:text-white hover:bg-red-400',
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
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-red-400 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  ) : null}
                </NavLink>
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
                  <NavLink
                    to={team.href}
                    end
                    className={classNames(
                      team.current
                        ? 'bg-red-400 text-white'
                        : 'text-indigo-200 hover:text-white hover:bg-red-400',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-red-400 text-[0.625rem] font-medium text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>            
          </li>
         
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-red-400"
            >
              <img
                className="h-8 w-8 rounded-full bg-red-400"
                src="https://res.cloudinary.com/dwnik4k9e/image/upload/v1713075930/samples/pyugab3qdtd1vwuxp3vm.png"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Vamsi Vangari</span>
            </a>
          </li>
        </ul>
        
      </nav>
      <button
            type="button"
            className="rounded bg-white/10 px-2 py-2 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
            onClick={handleLogout}
          >
        Logout
      </button>
    </div>
  );
}

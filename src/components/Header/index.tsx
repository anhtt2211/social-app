import { Fragment } from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/user';

export function Header() {
  const { user, loginIn } = useAppSelector((state) => state.auth);

  return (
    <nav className="py-4">
      <div className="container flex justify-between mx-auto">
        <a className="text-xl text-green font-bold" href="/#/">
          Social App
        </a>
        <ul className="flex justify-between">
          <HashRouter>
            <NavItem text="Home" href="/" />

            {loginIn ? <UserLinks user={user} /> : <GuestLinks />}
          </HashRouter>
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon?: string;
}) {
  return (
    <li className="px-2">
      <NavLink
        exact
        to={href}
        activeClassName="!text-black"
        className="text-gray-400"
      >
        {icon && <i className={icon}></i>}&nbsp;
        {text}
      </NavLink>
    </li>
  );
}

function GuestLinks() {
  return (
    <Fragment>
      <NavItem text="Sign in" href="/sign-in" />
      <NavItem text="Sign up" href="/sign-up" />
    </Fragment>
  );
}

function UserLinks({ user: { username } }: { user: User }) {
  return (
    <Fragment>
      <NavItem text="New Article" href="/editor" icon="ion-compose" />
      <NavItem text="Settings" href="/settings" icon="ion-gear-a" />
      <NavItem text={`${username}`} href={`/profile/${username}`} />
    </Fragment>
  );
}

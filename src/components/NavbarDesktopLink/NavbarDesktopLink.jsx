import React from 'react';
import { Link } from 'gatsby';

export default function NavbarDesktopLink(props) {
    return (
        <li class='navbar-desktop-link'><Link to={props.link.slug}>{props.link.title}</Link></li>
    );
}
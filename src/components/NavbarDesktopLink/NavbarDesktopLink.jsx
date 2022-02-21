import React from 'react';
import { Link } from 'gatsby';

export default function NavbarDesktopLink(props) {
    function mouseEnter() {
        return (
            <li><Link class="navbar-desktop-button" to={props.link.slug}>{props.link.title}</Link><div class="navigation-link-underline"></div></li>
        );
    }
    return (
        <li><Link onMouseEnter={mouseEnter} class="navbar-desktop-button" to={props.link.slug}>{props.link.title}</Link></li>
    );
}
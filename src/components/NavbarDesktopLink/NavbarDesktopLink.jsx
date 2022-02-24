import React from 'react';
import { Link } from 'gatsby';

export default function NavbarDesktopLink(props) {
    switch (props.state) {
        case 'default':
            return (
                <li class='navbar-desktop-link'><Link to={props.link.slug} onMouseEnter={props.onMouseEnter}>{props.link.title}</Link></li>
            );
        case 'background':
            return (
                <li class='navbar-desktop-link navbar-desktop-link-background'><Link to={props.link.slug}>{props.link.title}</Link></li>
            );
        case 'hover':
            return (
                <li class='navbar-desktop-link'><Link to={props.link.slug}>{props.link.title}<div class='navbar-desktop-link-underline'/></Link></li>
            );
    }
}
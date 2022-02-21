import React from 'react';

import NavbarDesktopLink from '../NavbarDesktopLink/NavbarDesktopLink';

export default function NavbarDesktop(props) {
    const links = props.navigation.map((link) => (
        <NavbarDesktopLink link={link}/>
    ));

    return (
        <div class="navbar-desktop-container">
            <div class="navbar-desktop">
                <h1>Alek's tutorials</h1>
                <ul>
                    {links}
                </ul>
            </div>
        </div>
    )
}
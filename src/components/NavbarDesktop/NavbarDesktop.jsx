import React, { useEffect, useState } from 'react';

import NavbarDesktopLink from '../NavbarDesktopLink/NavbarDesktopLink';

export default function NavbarDesktop(props) {
    const links = props.navigation.map((link) =>
        <NavbarDesktopLink link={link}/>
    );

    return (
        <div class="navbar-desktop-container">
            <div class="navbar-desktop">
                <div class="navbar-logo-container">
                    <img src={props.logo} alt=''/>
                    <h1>Alek's Tutorials</h1>
                </div>
                <ul>
                    {links}
                </ul>
            </div>
        </div>
    )
}
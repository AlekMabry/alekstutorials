import React, { useLayoutEffect, useState } from 'react';
import NavbarDesktop from '../NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../NavbarMobile/NavbarMobile';

function Navbar(props) {
    const navigation = [
        {
            'slug': '',
            'title': 'Portfolio'
        },
        {
            'slug': 'tutorials/',
            'title': 'Tutorials'
        },
        {
            'slug': 'web-development',
            'title': 'Web Development'
        },
        {
            'slug': 'contact',
            'title': 'Contact'
        }
    ];

    const [width, setWidth] = React.useState(window.innerWidth);

    function updateWidth() {
        setWidth(window.innerWidth);
    }

    React.useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    })

    if (width >= 800) {
        return (
            <NavbarDesktop navigation={navigation}/>
        );
    } else {
        return (
            <NavbarMobile navigation={navigation}/>
        );
    }
}

export default Navbar;
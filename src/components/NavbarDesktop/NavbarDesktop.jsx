import React, { useEffect, useState } from 'react';

import NavbarDesktopLink from '../NavbarDesktopLink/NavbarDesktopLink';

export default function NavbarDesktop(props) {
    const [linkState, setLinkState] = useState(() => {
        var linkArray = [];
        for (var i = 0; i < props.navigation.length; i++) {
            linkArray.push({'link': props.navigation[i], 'state': 'default'});
        }
        console.log(linkArray);
        return linkArray;
    });

    function mouseHover(linkIndex) {
        var newLinkState = linkState.slice();
        for (var i = 0; i < newLinkState.length; i++) {
            newLinkState[i].state = 'hover';// linkIndex == i ? 'hover' : 'background';
        }
        console.log("MOUSE ENTER: " + linkIndex);
        console.log(newLinkState);
        setLinkState(newLinkState);
    }

    function mouseLeave() {
        var newLinkState = linkState.slice();
        for (var i = 0; i < newLinkState.length; i++) {
            newLinkState[i].state = 'default';
        }
        console.log("MOUSE LEAVE");
        setLinkState(newLinkState);
    }

    var links = linkState.map((link, i) => {
        switch(link.state) {
            case 'default':
                return (<NavbarDesktopLink onMouseEnter={() => mouseHover(i)} link={link.link} state='default'/>);
            case 'background':
                return (<NavbarDesktopLink link={link.link} state='background'/>);
            case 'hover':
                return (<NavbarDesktopLink link={link.link} state='hover'/>);
        }
    });

    return (
        <div class="navbar-desktop-container">
            <div class="navbar-desktop">
                <div class="navbar-logo-container">
                    <img src={props.logo} alt=''/>
                    <h1>Alek's Tutorials</h1>
                </div>
                <ul onMouseLeave={mouseLeave}>
                    {links}
                </ul>
            </div>
        </div>
    )
}
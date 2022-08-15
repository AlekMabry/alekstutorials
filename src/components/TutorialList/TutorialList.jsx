import React from 'react';

import TutorialItem from '../TutorialItem/TutorialItem';

export default function TutorialList(props) {
    const titles = props.tutorials.map((tutorial) =>
        <TutorialItem tutorial={tutorial}/>
    );

    return (
        <>{titles}</>
    );
}
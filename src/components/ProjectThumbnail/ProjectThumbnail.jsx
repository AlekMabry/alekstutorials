import React from 'react';
import { Link } from 'gatsby';

export default function ProjectThumbnail(props) {
    const service = props.project.frontmatter.collection === 'services' ?
        <div class='project-service-label'>Service!</div> : <div></div>;

    return (
        <Link class='project-item' to={'/' + props.project.frontmatter.slug}>
            {service}
            <div class='project-item-content'>
                <img src={props.project.frontmatter.thumb} alt=''/>
                <div class='project-title'>
                    <h2>{props.project.frontmatter.title}</h2>
                </div>
            </div>
        </Link>
    );
}
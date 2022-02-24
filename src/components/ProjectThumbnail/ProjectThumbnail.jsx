import React from 'react';
import { Link } from 'gatsby';

export default function ProjectThumbnail(props) {
    return (
        <Link class='project-item' to={'/' + props.project.frontmatter.slug}>
            <div class='project-item-content'>
                <img src={props.project.frontmatter.thumb} alt=''/>
                <div class='project-title'>
                    <h2>{props.project.frontmatter.title}</h2>
                </div>
                
            </div>
        </Link>
    );
}
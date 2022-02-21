import React from 'react';

import ProjectThumbnail from '../ProjectThumbnail/ProjectThumbnail';

export default function ProjectsGallery(props) {
    const projects = props.projects.map((project) =>
            <ProjectThumbnail project={project}/>
        );

    return (
        <div class="project-gallery">
            {projects}
        </div>
    );
}
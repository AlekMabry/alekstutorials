# alekstutorials.com

Source for alekstutorials.com. It uses Gatsby (React static-site generator) and is hosted with AWS.

### Gatsby/React
The website is built with Gatsby, a React static-site generator. This means that the website is written
as React (Js) components, which are compiled with the website content (markdown files or yaml) into 
a static website. 

### Netlify
The website uses Netlify as it's CMS (Content Management System). Netlify is a web app bundled with this
site that allows me to edit articles. It "saves" these changes by pushing them to markdown files in
this repository.

### AWS
This website is hosted with AWS Amplify. When I push a change (or Netlify pushes a change), AWS
automatically recompiles this repository into the new static website. 
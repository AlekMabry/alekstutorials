module.exports = {
  siteMetadata: {
      title: `Alek's Tutorials`,
      author: `Aleksander Mabry`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options:
      {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              prompt: {
                user: "debian",
                host: "192.168.7.2",
                global: true
              }
            }
          },
          `gatsby-remark-autolink-headers`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/content/articles/`
      }
    }
  ]
};
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-stylus-resources`,
      options: {
        resources: [
          "./src/styles/consts.styl",
          "./src/styles/fonts.styl",
          "./src/styles/utils.styl",
          "./src/styles/text-styles.styl",
          "./src/styles/index.styl",
        ],
        postCssPlugins: [require("tailwindcss"), require(`autoprefixer`), require(`cssnano`)],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        whitelist: [
          "hover:text-plumPale",
          "hover:text-plum",
          "hover:text-tomatoPale",
          "hover:text-tomato",
          "hover:text-deepBluePale",
          "hover:text-deepBlue",
          "hover:text-plantPale",
          "hover:text-plant",
          "bg-plumPale",
          "bg-plum",
          "bg-tomatoPale",
          "bg-tomato",
          "bg-deepBluePale",
          "bg-deepBlue",
          "bg-plantPale",
          "bg-plant",
          "sm:bg-plumPale",
          "sm:bg-plum",
          "sm:bg-tomatoPale",
          "sm:bg-tomato",
          "sm:bg-deepBluePale",
          "sm:bg-deepBlue",
          "sm:bg-plantPale",
          "sm:bg-plant",
          "sm:mt-6",
        ], // Don't remove this selector
        ignore: [
          "/node_modules/defaults.css/defaults.css",
          "src/components/markdown/index.module.styl",
        ], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `ru`],
        defaultLanguage: `ru`,
        redirect: true,
      },
    },
    {
      resolve: `gatsby-plugin-svgr-svgo`,
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                  removeDimensions: true,
                },
              ],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-166494479-1",
      },
    },
    `gatsby-plugin-offline`,
  ],
}

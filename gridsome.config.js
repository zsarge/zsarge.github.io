// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: "zsarge",
	plugins: [
		{
			use: "@gridsome/source-filesystem",
			options: {
				path: "blog/**/*.md",
				typeName: "Post",
				remark: {
					// remark options
				},
			},
		},
		{
			use: "gridsome-plugin-typescript",
		},
	],
	transformers: {
		remark: {
			externalLinksTarget: "_blank",
			externalLinksRel: ["nofollow", "noopener", "noreferrer"],
			anchorClassname: "icon icon-link",
		},
	},
	publicPath: "",
	outputDir: "docs",
};

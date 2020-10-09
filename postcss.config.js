module.exports = {
  plugins: [
    require('postcss-import')(),
    require('tailwindcss')(),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
  ],
};

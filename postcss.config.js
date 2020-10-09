module.exports = {
  plugins: [
    require('postcss-import')(),
    require('@tailwindcss/ui'),
    require('tailwindcss')(),
    ...(process.env.NODE_ENV === 'production' ? [] : []),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
  ],
};

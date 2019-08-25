module.exports = {
  siteName: '掘金数据',
  logoPath: '/rocket_64x64.png',

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/login/],
    },
  ],
}

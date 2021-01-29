module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/meetup/' //имя проекта на gh-pages
    : '/' //путь для development mode
}
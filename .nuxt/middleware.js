const middleware = {}

middleware['auth-redirect'] = require('..\\middleware\\auth-redirect.js')
middleware['auth-redirect'] = middleware['auth-redirect'].default || middleware['auth-redirect']

middleware['google-user'] = require('..\\middleware\\google-user.js')
middleware['google-user'] = middleware['google-user'].default || middleware['google-user']

middleware['isCurrentUser'] = require('..\\middleware\\isCurrentUser.js')
middleware['isCurrentUser'] = middleware['isCurrentUser'].default || middleware['isCurrentUser']

middleware['login'] = require('..\\middleware\\login.js')
middleware['login'] = middleware['login'].default || middleware['login']

middleware['new-usre'] = require('..\\middleware\\new-usre.js')
middleware['new-usre'] = middleware['new-usre'].default || middleware['new-usre']

middleware['no-child'] = require('..\\middleware\\no-child.js')
middleware['no-child'] = middleware['no-child'].default || middleware['no-child']

export default middleware

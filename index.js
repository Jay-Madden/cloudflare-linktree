import { DivTransformer, HTransformer, ImgTransformer } from './htmlTransformer'
const Router = require('./router')

const linkUrl = '/links'
const htmlFetchUrl = 'https://static-links-page.signalnerve.workers.dev'
const avatarUrl =
    'https://avatars3.githubusercontent.com/u/25359755?s=460&u=7ce6c304b7a17cc4fe06d927758b13783eab2253&v=4'

const solarizedHex = '#073642'

let generateLink = (name, url) => ({ name: name, url: url })

const socialLinks = [
    generateLink('github', 'https://github.com/Jay-Madden'),
    generateLink('linkedin', 'https://www.linkedin.com/in/jaymaddencox/'),
    generateLink('twitter', 'https://twitter.com/jaymaddencox'),
]
const links = [
    generateLink('Clembot', 'https://github.com/ClemsonCPSC-Discord/ClemBot'),
    generateLink('Productivity Track', 'https://github.com/Jay-Madden/ProductivityTrack'),
    generateLink('Group10', 'https://github.com/Jay-Madden/Group10'),
    generateLink('Linktree Source', 'https://github.com/Jay-Madden/cloudflare-linktree'),
]

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({ some: 'json' })
    return new Response(body, init)
}

async function handleRequest(request) {
    const r = new Router()

    r.get(linkUrl, () => new Response(JSON.stringify(links)))
    r.setDefaultRoute('get', '/', async () => await getLinkHtml(htmlFetchUrl))

    const resp = await r.route(request)
    return resp
}

async function getLinkHtml(route) {
    const init = {
        headers: {
            'content-type': 'text/html;charset=UTF-8',
        },
    }
    const response = await fetch(route, init)

    const linkHtml = new HTMLRewriter()
        .on('div', new DivTransformer(links, socialLinks))
        .on('img', new ImgTransformer(avatarUrl))
        .on('h1', new HTransformer('Jay Madden'))
        .on('title', {
            element: async e => e.setInnerContent('Jay Maddens Links'),
        })
        .on('body', {
            element: async e =>
                e.setAttribute('style', `background-color:${solarizedHex};`),
        })
        .transform(response)

    const text = await linkHtml.text()

    return new Response(text, init)
}

import * as svg from './htmlSvg'

export class DivTransformer {
    constructor(links, social) {
        this.links = links
        this.socialLinks = social
    }

    async element(element) {
        const idAttrib = element.getAttribute('id')
        if (idAttrib === 'links') {
            for (var link of this.links) {
                element.append(`<a href="${link.url}">${link.name}</a>\n`, {
                    html: true,
                })
            }
        } else if (idAttrib === 'profile') {
            element.removeAttribute('style')
        } else if (idAttrib === 'social') {
            element.removeAttribute('style')
            for (var link of this.socialLinks) {
                element.append(
                    `<a href="${link.url}">${svg.icons[link.name]}</a>`,
                    {
                        html: true,
                    }
                )
            }
        }
    }
}

export class ImgTransformer {
    constructor(url) {
        this.url = url
    }

    async element(element) {
        if (element.getAttribute('id') === 'avatar') {
            element.setAttribute('src', this.url)
        }
    }
}
export class HTransformer {
    constructor(name) {
        this.name = name
    }

    async element(element) {
        if (element.getAttribute('id') === 'name') {
            element.setAttribute('name', this.name)
            element.append(this.name)
        }
    }
}

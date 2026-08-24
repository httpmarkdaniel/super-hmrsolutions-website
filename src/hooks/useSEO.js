import { useEffect } from 'react'

const SITE_URL = 'https://www.hmrsolutions.net'
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`
const SITE_NAME = 'HMR Solutions'

function setMeta(property, attrName, value) {
  let el = document.querySelector(`meta[${attrName}="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function removeJsonLd(id) {
  const el = document.getElementById(id)
  if (el) el.remove()
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  schema,
  schemaId = 'page-schema',
}) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      setMeta('description', 'name', description)
      setMeta('og:description', 'property', description)
      setMeta('twitter:description', 'name', description)
    }

    if (title) {
      setMeta('og:title', 'property', title)
      setMeta('twitter:title', 'name', title)
    }

    setMeta('og:site_name', 'property', SITE_NAME)
    setMeta('og:type', 'property', 'website')

    const canonicalUrl = canonical
      ? `${SITE_URL}${canonical}`
      : window.location.href.split('?')[0]
    setLink('canonical', canonicalUrl)
    setMeta('og:url', 'property', canonicalUrl)

    const image = ogImage || DEFAULT_IMAGE
    setMeta('og:image', 'property', image)
    setMeta('og:image:width', 'property', '1200')
    setMeta('og:image:height', 'property', '630')
    setMeta('twitter:card', 'name', 'summary_large_image')
    setMeta('twitter:image', 'name', image)

    setMeta('robots', 'name', noindex ? 'noindex, nofollow' : 'index, follow')

    if (schema) setJsonLd(schemaId, schema)

    return () => {
      if (schema) removeJsonLd(schemaId)
    }
  }, [title, description, canonical, ogImage, noindex, schema, schemaId])
}

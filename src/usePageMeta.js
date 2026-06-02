import { useEffect } from 'react';

// Helper: get or create a meta/link tag by selector, creating if absent.
function getOrCreate(selector, createElement) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = createElement();
    document.head.appendChild(tag);
  }
  return tag;
}

function setMeta(selector, attrKey, attrVal, contentKey, content) {
  const tag = getOrCreate(selector, () => {
    const el = document.createElement('meta');
    el.setAttribute(attrKey, attrVal);
    return el;
  });
  tag.setAttribute(contentKey, content);
}

function setLink(rel, href) {
  const tag = getOrCreate(`link[rel="${rel}"]`, () => {
    const el = document.createElement('link');
    el.setAttribute('rel', rel);
    return el;
  });
  tag.setAttribute('href', href);
}

// Atualiza <title>, meta description, og:title, og:description,
// twitter:title, twitter:description e canonical ao montar cada página.
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', 'content', description);
    }

    if (title) {
      setMeta('meta[property="og:title"]', 'property', 'og:title', 'content', title);
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', 'content', title);
    }

    if (description) {
      setMeta('meta[property="og:description"]', 'property', 'og:description', 'content', description);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', 'content', description);
    }

    const canonical = window.location.origin + window.location.pathname;
    setLink('canonical', canonical);
    setMeta('meta[property="og:url"]', 'property', 'og:url', 'content', canonical);
  }, [title, description]);
}

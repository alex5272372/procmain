export const resizeEffect = () => {
  const handleResize = () => {
    const grid: HTMLElement | null = document.querySelector('div[role=grid]')
    if (grid) {
      const header: HTMLElement | null = document.querySelector('nav[role=navigation]')
      const footer: HTMLElement | null = document.querySelector('footer')
      grid.style.height = `${window.innerHeight
        - (header ? header.clientHeight : 0)
        - (footer ? footer.clientHeight : 0)
      }px`
    }
  }

  document.documentElement.style.overflowY = 'hidden'
  handleResize()
  window.addEventListener('resize', handleResize)

  return () => {
    document.documentElement.style.overflowY = 'scroll'
    window.removeEventListener('resize', handleResize)
  }
}

export const splitKey = (key: string): {
  path: string, query: string, subfld: string[], params: Record<string, string>
} => {
  const [path, query] = key.split('?')
  const subfld = path.split('/').slice(1)

  const params = query.split('&').reduce((acc: any, cur: any) => {
    const [k, v] = cur.split('=')
    acc[k] = v
    return acc
  }, {})

  return { path, query, subfld, params }
}

export const getTitle = (detail: string, ...rest: (string | null | undefined)[]): {
  title: string, key: string
} => {
  let title = ''
  let key = ''

  if (detail === 'user') {
    title = `${rest[1]} (${rest[0]})`
    key = `/detail/user?id=${rest[0]}`

  }

  return { title, key }
}

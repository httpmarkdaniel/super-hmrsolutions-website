export default function ScrollProgress({ scrollY }) {
  const h = document.documentElement
  const pct = h.scrollHeight - h.clientHeight > 0
    ? (scrollY / (h.scrollHeight - h.clientHeight)) * 100
    : 0
  return <div id="prog" aria-hidden="true" style={{ width: `${pct}%` }} />
}

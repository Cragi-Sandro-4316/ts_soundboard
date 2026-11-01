export function SoundButton({ name, color, url }: { name: string; color: string, url: string }) {

  const play = () => {
    console.log('audio:' + url)
    new Audio(url).play()
  }

  return (
    <button
      onClick={play}
      style={{ width: '120px', height: '120px', background: color }}
    >
      {name}
    </button>
  )
}

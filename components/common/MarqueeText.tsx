import Marquee from 'react-fast-marquee'

interface MarqueeTextProps {
  text: string
  repeat?: number
  color?: string
  className?: string
  speed?: number
}

export default function MarqueeText({
  text,
  repeat = 10,
  color,
  className = "text-4xl md:text-5xl font-black tracking-wider",
  speed = 50
}: MarqueeTextProps) {
  const marqueeText = Array(repeat).fill(text)

  return (
    <div className="h-fit overflow-hidden">
      <Marquee
        speed={speed}
        gradient={false}
        direction="right"
        className="py-4"
      >
        {marqueeText.map((text, i) => (
          <span
            key={i}
            className={`${className} mx-2`}
            style={{ color }}
          >
            {text}
          </span>
        ))}
      </Marquee>
    </div>
  )
} 
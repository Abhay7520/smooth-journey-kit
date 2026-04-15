interface PageBackgroundProps {
  image: string;
  opacity?: number;
}

const PageBackground = ({ image, opacity = 0.15 }: PageBackgroundProps) => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <img
      src={image}
      alt=""
      className="h-full w-full object-cover"
      style={{ opacity }}
      loading="lazy"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/80 to-[#050508]" />
  </div>
);

export default PageBackground;

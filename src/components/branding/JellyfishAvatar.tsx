import jellyfish from "@/assets/jellyfish.png";

interface JellyfishAvatarProps {
  speaking?: boolean;
  size?: number;
}

const JellyfishAvatar = ({ speaking = false, size = 160 }: JellyfishAvatarProps) => {
  return (
    <div
      className="relative mx-auto select-none"
      aria-label="Aurify Jellyfish Coach"
      role="img"
      style={{ width: size, height: size }}
    >
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-opacity ${
          speaking ? "opacity-90" : "opacity-50"
        }`}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, hsl(256 84% 64% / 0.45), transparent 70%), radial-gradient(45% 45% at 55% 55%, hsl(190 70% 45% / 0.35), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <img
        src={jellyfish}
        width={size}
        height={size}
        alt="Floating jellyfish avatar"
        className="relative z-10 drop-shadow-md animate-float"
        loading="lazy"
      />
    </div>
  );
};

export default JellyfishAvatar;

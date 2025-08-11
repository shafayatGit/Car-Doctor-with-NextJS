"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
// import img1 from "../../../assets/images/banner/1.jpg";
// import img2 from "../../../assets/images/banner/2.jpg";
// import img3 from "../../../assets/images/banner/3.jpg";
// import img4 from "../../../assets/images/banner/4.jpg";

const slides = [
  {
    id: 1,
    image:
      "/1.jpg",
    title: "Affordable Price For Car Servicing",
    subtitle:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
  },
  {
    id: 2,
    image:
      "/2.jpg",
    title: "Affordable Price For Car Servicing",
    subtitle:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
  },
  {
    id: 3,
    image:
      "/3.jpg",
    title: "Affordable Price For Car Servicing",
    subtitle:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000); // slide every 4 seconds

    return () => clearInterval(timer);
  }, [length]);
  return (
    <div className="relative w-full" style={{ height: "100dvh" }}>
      {slides.map((slide, index) => (
          // console.log(slide.image)
          <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            >
          <Image
          width={500}
          height={500}
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl drop-shadow-lg">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

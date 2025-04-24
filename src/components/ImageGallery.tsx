
import React, { useState } from "react";
import { Image as LucideImage, Sparkles } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "Misty Forest",
    category: "Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "City Skyline",
    category: "Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    title: "Desert Dunes",
    category: "Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    title: "Smiling Woman",
    category: "People",
  },
  {
    url: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    title: "Modern Building",
    category: "Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    title: "Mountain Lake",
    category: "Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    title: "Friends Laughing",
    category: "People",
  },
  {
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "Urban Geometry",
    category: "Architecture",
  },
];

const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))];

export function ImageGallery() {
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All"
    ? images
    : images.filter((img) => img.category === selected);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center py-10 px-2">
      <div className="flex items-center gap-2 mb-6">
        <LucideImage className="w-7 h-7 text-indigo-500" />
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Responsive Image Gallery
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200
              ${
                selected === cat
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 hover:bg-indigo-100"
              }
              border border-indigo-200 hover:shadow-md`}
            onClick={() => setSelected(cat)}
            aria-pressed={selected === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        className="
          grid
          gap-6
          w-full
          max-w-5xl
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          transition-all
          duration-300
        "
      >
        {filtered.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-20">
            <Sparkles className="w-10 h-10 text-indigo-400 mb-2 animate-bounce" />
            <p className="text-lg text-slate-500 font-semibold">
              No images found in this category.
            </p>
          </div>
        ) : (
          filtered.map((img, i) => (
            <div
              key={img.url + i}
              className="
                group
                relative
                rounded-xl
                overflow-hidden
                shadow-md
                bg-white
                hover:shadow-xl
                transition-shadow
                duration-300
                cursor-pointer
                border border-slate-100
              "
              tabIndex={0}
            >
              <img
                src={img.url}
                alt={img.title}
                className="
                  w-full h-48 object-cover
                  group-hover:scale-105
                  group-focus:scale-105
                  transition-transform
                  duration-300
                  ease-in-out
                "
                loading="lazy"
              />
              <div
                className="
                  absolute bottom-0 left-0 right-0
                  bg-gradient-to-t from-slate-900/70 to-transparent
                  px-4 py-3
                  flex items-end
                  min-h-[3rem]
                "
              >
                <span className="text-white font-semibold text-base drop-shadow">
                  {img.title}
                </span>
              </div>
              <span
                className="
                  absolute top-2 right-2
                  bg-indigo-500/90 text-white text-xs px-2 py-1 rounded-full
                  font-semibold shadow
                  opacity-0 group-hover:opacity-100 group-focus:opacity-100
                  transition-opacity duration-200
                "
              >
                {img.category}
              </span>
            </div>
          ))
        )}
      </div>
      <footer className="mt-16 text-slate-400 text-sm">
        Powered by Unsplash &middot; Built with <span className="text-indigo-500 font-bold">Blink</span>
      </footer>
    </div>
  );
}
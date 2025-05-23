
import React, { useState } from "react";
import { Image as LucideImage, Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Add more images for a richer gallery
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
  {
    url: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    title: "Glass Facade",
    category: "Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "Night Lights",
    category: "Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    title: "Golden Desert",
    category: "Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    title: "Joyful Child",
    category: "People",
  },
];

const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ImageGallery() {
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // Pagination for extra delight (4 per page)
  const filtered = selected === "All"
    ? images
    : images.filter((img) => img.category === selected);

  const pageSize = 8;
  const pageCount = Math.ceil(filtered.length / pageSize);
  const pagedImages = filtered.slice(page * pageSize, (page + 1) * pageSize);

  // Simulate loading for filter transitions
  function handleFilter(cat: string) {
    setLoading(true);
    setTimeout(() => {
      setSelected(cat);
      setPage(0);
      setLoading(false);
    }, 320);
  }

  function handlePageChange(next: boolean) {
    setLoading(true);
    setTimeout(() => {
      setPage((prev) => {
        if (next) return Math.min(prev + 1, pageCount - 1);
        return Math.max(prev - 1, 0);
      });
      setLoading(false);
    }, 220);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 flex flex-col items-center py-10 px-2">
      <div className="flex items-center gap-2 mb-6 animate-fade-in">
        <LucideImage className="w-8 h-8 text-indigo-500 drop-shadow" />
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight font-[Nunito]">
          <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
            Responsive Image Gallery
          </span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-8 animate-fade-in">
        {categories.map((cat) => (
          <button
            key={cat}
            className={classNames(
              "px-5 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60",
              selected === cat
                ? "bg-gradient-to-r from-indigo-500 to-sky-400 text-white shadow-lg scale-105"
                : "bg-white text-slate-700 hover:bg-indigo-100"
            )}
            onClick={() => handleFilter(cat)}
            aria-pressed={selected === cat}
            tabIndex={0}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="relative w-full max-w-5xl min-h-[28rem]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-xl">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          </div>
        ) : null}
        <div
          className={classNames(
            "grid gap-7 w-full transition-all duration-500",
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            loading && "opacity-40 pointer-events-none blur-[2px]"
          )}
        >
          {pagedImages.length === 0 && !loading ? (
            <div className="col-span-full flex flex-col items-center py-20 animate-fade-in">
              <Sparkles className="w-10 h-10 text-indigo-400 mb-2 animate-bounce" />
              <p className="text-lg text-slate-500 font-semibold">
                No images found in this category.
              </p>
            </div>
          ) : (
            pagedImages.map((img, i) => (
              <div
                key={img.url + i}
                className="group relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-slate-100 animate-fade-in"
                tabIndex={0}
                style={{
                  animationDelay: `${i * 40}ms`,
                  animationDuration: "600ms",
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-52 object-cover group-hover:scale-110 group-focus:scale-110 transition-transform duration-500 ease-in-out"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-4 py-3 flex items-end min-h-[3rem]">
                  <span className="text-white font-bold text-lg drop-shadow font-[Nunito]">
                    {img.title}
                  </span>
                </div>
                <span
                  className="absolute top-2 right-2 bg-indigo-500/90 text-white text-xs px-3 py-1 rounded-full font-semibold shadow opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200"
                >
                  {img.category}
                </span>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
        {pagedImages.length > 0 && pageCount > 1 && !loading && (
          <div className="flex justify-center items-center gap-4 mt-8 animate-fade-in">
            <button
              className="p-2 rounded-full bg-white border border-indigo-200 shadow hover:bg-indigo-50 transition disabled:opacity-40"
              onClick={() => handlePageChange(false)}
              disabled={page === 0}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-500" />
            </button>
            <span className="text-slate-600 font-semibold">
              Page {page + 1} of {pageCount}
            </span>
            <button
              className="p-2 rounded-full bg-white border border-indigo-200 shadow hover:bg-indigo-50 transition disabled:opacity-40"
              onClick={() => handlePageChange(true)}
              disabled={page === pageCount - 1}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 text-indigo-500" />
            </button>
          </div>
        )}
      </div>
      <footer className="mt-16 text-slate-400 text-sm animate-fade-in">
        Powered by <a href="https://unsplash.com" className="underline hover:text-indigo-500">Unsplash</a> &middot; Built with <span className="text-indigo-500 font-bold">Blink</span>
      </footer>
      {/* Animations */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1.000) both;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
}
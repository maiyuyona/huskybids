"use client";

import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FrameHome = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const scrollRef = useRef(null);

  useEffect(() => {
    generateDates(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    centerSelectedDate();
  }, [dates]);

  const generateDates = (centerDate) => {
    const range = [];
    for (let i = -50; i <= 50; i++) {
      range.push(centerDate.add(i, "day"));
    }
    setDates(range);
  };

  const centerSelectedDate = () => {
    if (scrollRef.current && dates.length > 0) {
      const index = dates.findIndex((date) => date.isSame(selectedDate, "day"));
      const itemWidth = 100;
      const containerWidth = scrollRef.current.offsetWidth;
      const scrollAmount = containerWidth / 2 + itemWidth / 2 - 4 * itemWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 100 * 3;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#4b2e83] overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full h-full p-2 md:p-4 box-border">
        {/* Scrollable Date Bar */}
        <div className="relative flex items-center justify-center w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1100px] mb-4">
          <button 
            onClick={() => scroll("left")} 
            className="absolute left-0 z-10 bg-[#4b2e83]/70 rounded-full p-1 hover:bg-[#4b2e83]"
          >
            <ChevronLeft size={24} color="#c5b4e3" />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll space-x-2 w-full px-8 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
              justifyContent: "center",
            }}
          >
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={`cursor-pointer px-2 py-2 rounded-lg text-center transition-all duration-300 min-w-[80px] flex-shrink-0 scroll-snap-align-center ${
                  date.isSame(selectedDate, "day")
                    ? "bg-[#c5b4e3] text-[#4b2e83] font-bold scale-105"
                    : "text-[#c5b4e3] hover:bg-[#5c3a94]"
                }`}
              >
                {date.format("MMM DD")}
              </div>
            ))}
          </div>
          <button 
            onClick={() => scroll("right")} 
            className="absolute right-0 z-10 bg-[#4b2e83]/70 rounded-full p-1 hover:bg-[#4b2e83]"
          >
            <ChevronRight size={24} color="#c5b4e3" />
          </button>
        </div>

        <div className="text-start text-white text-lg md:text-xl mb-2 w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1100px]">
          Events for {selectedDate.format("MMMM DD, YYYY")}
        </div>

        <div className="bg-[#4b2e83] overflow-hidden w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1100px] flex-1 relative rounded-xl border-2 border-[#c5b4e3]">
          <div className="absolute w-full text-center top-1/2 transform -translate-y-1/2 text-white text-lg md:text-xl">
            Content related to {selectedDate.format("MMM DD")} will be displayed here.
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-snap-align-center {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
};

export default FrameHome;

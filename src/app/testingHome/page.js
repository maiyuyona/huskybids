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
    <div className="bg-[#4b2e83] flex w-full min-h-screen relative">
      {/* Left Menu */}
      <div className="w-[20%] bg-[#3a2365] p-6 text-white rounded-r-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Left Menu</h2>
        <ul className="space-y-2">
          <li className="hover:text-[#c5b4e3] cursor-pointer">Menu Item 1</li>
          <li className="hover:text-[#c5b4e3] cursor-pointer">Menu Item 2</li>
          <li className="hover:text-[#c5b4e3] cursor-pointer">Menu Item 3</li>
        </ul>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center w-[60%] py-8 ml-10 mr-10">

        <div className="flex items-end w-full mb-8 [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-light-purple">
          <div className="relative flex items center w-full ">

          </div>
        </div>

        {/* scrollable date bar start */}
        <div className="relative flex items-center justify-center mb-8 w-full">
          <button onClick={() => scroll("left")} className="absolute left-0 z-10">
            <ChevronLeft size={32} color="#c5b4e3" />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll space-x-4 w-[700px] px-12 scrollbar-hide"
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
                className={`cursor-pointer px-4 py-2 rounded-lg text-center transition-all duration-300 min-w-[100px] flex-shrink-0 scroll-snap-align-center ${
                  date.isSame(selectedDate, "day")
                    ? "bg-[#c5b4e3] text-[#4b2e83] font-bold scale-110"
                    : "text-[#c5b4e3] hover:bg-[#5c3a94]"
                }`}
              >
                {date.format("MMM DD").toLowerCase()}
              </div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute right-0 z-10">
            <ChevronRight size={32} color="#c5b4e3" />
          </button>
        </div>
        {/* scrollable date bar end */}

        <div className="text-center text-white text-2xl mb-8">
          Events for {selectedDate.format("MMMM DD, YYYY")}
        </div>

        <div className="bg-[#4b2e83] overflow-hidden w-full max-w-[1360px] h-[857px] relative rounded-2xl border-4 border-[#c5b4e3]">
          <div className="absolute w-full text-center top-1/2 transform -translate-y-1/2 text-white text-xl">
            Content related to {selectedDate.format("MMM DD").toLowerCase()} will be displayed here.
          </div>
        </div>
      </div>

      {/* Right Menu */}
      <div className="w-[20%] bg-primary-purple p-6 text-white rounded-l-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Right Menu</h2>
        <ul className="space-y-2">
          <li className="hover:text-[#c5b4e3] cursor-pointer">Menu Item A</li>
          <li className="hover:text-[#c5b4e3] cursor-pointer">Menu Item B</li>
          <li className="hover:text-[#c5b4e3] cursor-pointer">Menu Item C</li>
        </ul>
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

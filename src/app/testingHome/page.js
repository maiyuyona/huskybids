"use client";
import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BiscuitIcon from "../Components/BiscuitIcon";
import { SAMPLE_GAMES } from "../data/games"; // Import your game data

dayjs.extend(isSameOrBefore);

const FrameHome = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with today's date
  const [claimedDates, setClaimedDates] = useState([]);
  const [biscuits, setBiscuits] = useState(3000); // Initial balance
  const scrollRef = useRef(null);

  // Function to load saved data
  const loadSavedData = () => {
    const savedClaims = localStorage.getItem('claimedBiscuitDates');
    const savedBalance = localStorage.getItem('biscuitBalance');
    if (savedClaims) setClaimedDates(JSON.parse(savedClaims));
    if (savedBalance) setBiscuits(Number(savedBalance));
  };

  // Initialize dates and load saved data
  useEffect(() => {
    generateCurrentMonthDates(); // Generate dates for the current month
    loadSavedData(); // Load data on mount
    
    // Center the scroll view on the current day after dates are loaded
    const timeoutId = setTimeout(() => {
      centerSelectedDate(dayjs()); // Center on today's date
    }, 100); 

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, []); 

  // Save balance when it changes
  useEffect(() => {
    localStorage.setItem('biscuitBalance', biscuits.toString());
  }, [biscuits]);

  const generateCurrentMonthDates = () => {
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');
    const range = [];
    let currentDay = startOfMonth;

    while (currentDay.isSameOrBefore(endOfMonth, 'day')) {
      range.push(currentDay);
      currentDay = currentDay.add(1, 'day');
    }
    setDates(range);
  };

  const centerSelectedDate = (dateToCenter) => {
    if (scrollRef.current && dates.length > 0) {
      const index = dates.findIndex((date) => date.isSame(dateToCenter, "day"));
      if (index !== -1) {
        const itemWidth = 100; // Approximate width of a date item
        const containerWidth = scrollRef.current.offsetWidth;
        const scrollPosition = (index * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
        
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
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

  const canClaim = (date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD');
    return dayjs(date).isSame(dayjs(), 'day') && !claimedDates.includes(dateString);
  };

  const claimDailyBiscuits = (date) => {
    if (canClaim(date)) {
      const dateString = dayjs(date).format('YYYY-MM-DD');
      const newClaims = [...claimedDates, dateString];
      
      setClaimedDates(newClaims);
      setBiscuits(prev => prev + 100);
      localStorage.setItem('claimedBiscuitDates', JSON.stringify(newClaims));
      
      alert(`100 Biscuits claimed for ${dayjs(date).format('MMMM D')}!`);
    } else if (!dayjs(date).isSame(dayjs(), 'day')) {
      alert("You can only claim biscuits for today!");
    } else {
      alert("You have already claimed biscuits for this day!");
    }
  };

  const getGamesForSelectedDate = () => {
    return SAMPLE_GAMES.filter(game => dayjs(game.date).isSame(selectedDate, 'day'));
  };

  const resetBiscuitsClaim = () => {
    localStorage.removeItem('claimedBiscuitDates'); // Remove the claim history
    setClaimedDates([]); // Reset state
    setBiscuits(1000); // Reset biscuits to initial amount
    alert("Biscuit claim history has been reset for today!");
  };

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden p-6">
      {/* Header Bar for Biscuit Balance and Reset Button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4"> {/* Changed left to right */}
        {/* Biscuit Balance Display */}
        <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full shadow-md border-2 border-purple-900">
          <BiscuitIcon size={20} className="text-purple-900" />
          <span className="font-bold text-purple-900">{biscuits} Biscuits</span>
        </div>

        {/* Reset Today's Claim Button */}
        <button
          onClick={resetBiscuitsClaim}
          className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors"
        >
          Reset Today's Claim
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full max-w-[1360px] mx-auto pt-16">
        {/* Selected Date Content Box */}
        <div className="bg-[#4b2e83] overflow-hidden w-full h-[857px] relative rounded-2xl border-4 border-[#c5b4e3] p-4 flex flex-col">
          {/* Calendar Dates positioned on top of the box */}
          <div className="relative flex items-center justify-center mb-4 w-full">
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
              }}
            >
              {dates.map((date, index) => (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`relative cursor-pointer px-4 py-2 rounded-lg text-center transition-all min-w-[100px] flex-shrink-0 ${
                    dayjs(date).isSame(selectedDate, "day")
                      ? "bg-[#c5b4e3] text-[#4b2e83] font-bold scale-110"
                      : "text-[#c5b4e3] hover:bg-[#5c3a94]"
                  } ${
                    !dayjs(date).isSame(dayjs(), 'day') && !dayjs(date).isSame(selectedDate, 'day') ? 'opacity-70' : ''
                  }`}
                >
                  {dayjs(date).format("MMM DD")}
                  
                  {/* Claim Button - Only visible if it's today and can be claimed */}
                  {canClaim(date) && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        claimDailyBiscuits(date);
                      }}
                      className="mt-2 bg-yellow-400 text-purple-900 text-xs px-2 py-1 rounded-full w-3/4 hover:bg-yellow-300 transition-colors"
                    >
                      +100 Biscuits
                    </button>
                  )}
                  
                  {/* Claimed/Past Day/Future Day Indicator - Only if not claimable */}
                  {!canClaim(date) && dayjs(date).isSame(dayjs(), 'day') && claimedDates.includes(dayjs(date).format('YYYY-MM-DD')) && (
                    <div className="mt-2 text-xs text-yellow-400">
                      Claimed
                    </div>
                  )}
                  {!dayjs(date).isSame(dayjs(), 'day') && (
                      <div className="mt-2 text-xs text-gray-300">
                          {dayjs(date).isBefore(dayjs(), 'day') ? 'Past Day' : 'Future Day'}
                      </div>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={() => scroll("right")} className="absolute right-0 z-10">
              <ChevronRight size={32} color="#c5b4e3" />
            </button>
          </div>

          <div className="text-start text-white text-2xl mb-4">
            Games for {dayjs(selectedDate).format("MMMM DD,YYYY")}
          </div>

          <div className="flex-1 overflow-y-auto text-white">
            {getGamesForSelectedDate().length > 0 ? (
              <ul className="space-y-3">
                {getGamesForSelectedDate().map(game => (
                  <li key={game.id} className="bg-[#5c3a94] p-3 rounded-lg shadow-md">
                    <p className="font-bold">
                      {game.isHome ? "vs." : "@"} {game.opponent}
                    </p>
                    <p className="text-sm">{game.time} - {game.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-white text-xl p-4">
                No games scheduled for {dayjs(selectedDate).format("MMM DD")}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameHome;
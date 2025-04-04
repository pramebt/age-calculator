"use client";
import { useState } from "react";
import Image from 'next/image';
const AgeCal = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "-", months: "-", days: "-" });

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
  
    if (ageDays) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths) {
      ageYears--;
      ageMonths += 12;
    }
    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };
  return (
    <div className="bg-white  md:w-[800px]  md:h-[600px] rounded-4xl rounded-br-[150px] w-[350px] h-[530px] ">
      <div className="flex flex-row md:gap-[30px] gap-[22px] mt-[70px] md:mt-[90px] md:ml-[58px] items-center ml-[15px]">
        <div className="flex flex-col">
          <h1 className="text-[#6E6E6E] text-[12px] font-bold ">D A Y S</h1>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border border-[#CAC8C8] rounded-[12px]  md:w-[150px] w-[92px] h-[60px] p-2"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#6E6E6E] text-[12px] font-bold ">M O N T H S</h1>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-[#CAC8C8] rounded-[12px] md:w-[150px] w-[92px] h-[60px] p-2"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#6E6E6E] text-[12px] font-bold ">Y E A R S</h1>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-[#CAC8C8] rounded-[12px] md:w-[150px] w-[92px] h-[60px] p-2"
          />
        </div>
      </div>

      <div className="h-[90px] flex items-center justify-center md:justify-start relative md:mt-4 mt-[32px]">
        <div className="bg-gray-400 h-[1px] mx-4 md:ml-[58px] md:w-[646px] w-[320px]"></div>
        <button  onClick={calculateAge} className="bg-black w-[90px] h-[90px] rounded-full flex absolute items-center justify-center  md:mt-0  md:right-[66px]">
          <Image src="/assets/images/icon-arrow.svg" alt="" width={100} height={100} className="w-10"/></button>
        
      </div>

      <div className="flex flex-col items-start  md:ml-[57px] mt-[24px] md:mt-4 ml-[15px]">
        <h1 className="flex items-center md:h-[90px] h-[70px] md:text-[96px] text-[62px] font-bold">
        {age.years} years
        </h1>
        <h1 className="flex items-center md:h-[90px] h-[70px] md:text-[96px] text-[62px] font-bold">
        {age.months} months
        </h1>
        <h1 className="flex items-center md:h-[90px] h-[70px] md:text-[96px] text-[62px] font-bold">
        {age.days} days
        </h1>
      </div>
    </div>
  );
};

export default AgeCal;

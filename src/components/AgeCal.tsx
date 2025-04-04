"use client";
import { useState } from "react";
import Image from "next/image";

const AgeCal = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState<{
    years: string | number;
    months: string | number;
    days: string | number;
  }>({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
  });

  const validateDate = (day: number, month: number, year: number): boolean => {
    const today = new Date();
    const currentYear = today.getFullYear();
    let valid = true;
    const newErrors = { day: "", month: "", year: "" };

    // ตรวจสอบหากช่องวันว่าง
    const daysInMonth = new Date(year, month, 0).getDate();
    if (!day) {
      newErrors.day = "This field is required";
      valid = false;
    } else if (day < 1 || day > daysInMonth) {
      newErrors.day = "Must be a valid days";
      valid = false;
    }

    // ตรวจสอบหากช่องเดือนว่าง
    if (!month) {
      newErrors.month = "This field is required";
      valid = false;
    } else if (month < 1 || month > 12) {
      newErrors.month = "Must be a valid months";
      valid = false;
    }

    // ตรวจสอบหากช่องปีว่าง
    if (!year) {
      newErrors.year = "This field is required";
      valid = false;
    } else if (year < 1 || year > currentYear) {
      newErrors.year = "Must be a valid year";
      valid = false;
    }

    // ตรวจสอบหากวันเกิดมากกว่าวันปัจจุบัน
    const birthDate = new Date(year, month - 1, day);
    if (birthDate > today) {
      newErrors.day = "Must be a valid days";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const calculateAge = () => {
    const birthDay = Number(day);
    const birthMonth = Number(month);
    const birthYear = Number(year);

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!validateDate(birthDay, birthMonth, birthYear)) {
      return;
    }

    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      setDay(value);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      setMonth(value);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
      setYear(value);
    }
  };

  return (
    <div className="bg-white md:w-[800px] md:h-[600px] rounded-4xl rounded-br-[150px] w-full h-fit p-3">
      <div className="flex col ">
        <div className=" flex flex-row md:gap-[30px] gap-[22px] mt-[60px] md:mt-[70px] md:ml-[58px] items-center md:justify-start justify-center w-full md:top-10 md:p-0 p-5">
          <div className="flex flex-col ">
            <h1
              className={`text-[12px] font-bold ${
                errors.day ? "text-red-500" : "text-[#6E6E6E]"
              }`}
            >
              D A Y S
            </h1>
            <input
              type="number"
              value={day}
              onChange={handleDayChange}
              className={`border rounded-[12px] md:w-[150px] w-[92px] h-[60px] p-2 ${
                errors.day ? "border-red-500" : "border-[#CAC8C8]"
              }`}
            />
            <div className=" md:h-[20px] h-[40px] md:w-[150px] w-[92px]">
              {errors.day && (
                <p className="text-red-500 text-sm">{errors.day}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h1
              className={`text-[12px] font-bold ${
                errors.month ? "text-red-500" : "text-[#6E6E6E]"
              }`}
            >
              M O N T H S
            </h1>
            <input
              type="number"
              value={month}
              onChange={handleMonthChange}
              className={`border rounded-[12px] md:w-[150px] w-[92px] h-[60px] p-2 ${
                errors.month ? "border-red-500" : "border-[#CAC8C8]"
              }`}
            />
            <div className="md:h-[20px]  h-[40px] md:w-[150px] w-[92px]">
              {errors.month && (
                <p className="text-red-500 text-sm">{errors.month}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h1
              className={`text-[12px] font-bold ${
                errors.year ? "text-red-500" : "text-[#6E6E6E]"
              }`}
            >
              Y E A R S
            </h1>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
              className={`border rounded-[12px] md:w-[150px] w-[92px] h-[60px] p-2 ${
                errors.year ? "border-red-500" : "border-[#CAC8C8]"
              }`}
            />
            <div className=" md:h-[20px] h-[40px] md:w-[150px] w-[92px]">
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[90px] flex items-center justify-center md:justify-start relative md:mt-4 mt-[32px]">
        <div className="bg-gray-400 h-[1px] mx-4 md:ml-[58px] md:w-[646px] w-[320px]"></div>
        <button
          onClick={calculateAge}
          className="bg-black w-[90px] h-[90px] rounded-full flex absolute items-center justify-center md:mt-0 md:right-[66px]"
        >
          <Image
            src="/assets/images/icon-arrow.svg"
            alt=""
            width={100}
            height={100}
            className="w-10"
          />
        </button>
      </div>

      <div className="flex flex-col items-start md:ml-[57px] mt-0  ml-[15px] ">
        <h1 className="flex items-center md:h-[90px] h-[70px] md:text-[96px] text-[58px] font-bold gap-4">
          <span className="text-[#864AFF]">{age.years}</span> years
        </h1>
        <h1 className="flex items-center md:h-[90px] h-[70px] md:text-[96px] text-[58px] font-bold gap-4">
          <span className="text-[#864AFF]">{age.months}</span> months
        </h1>
        <h1 className="flex items-center md:h-[90px] h-[70px] md:text-[96px] text-[58px] font-bold gap-4">
          <span className="text-[#864AFF]">{age.days}</span> days
        </h1>
      </div>
    </div>
  );
};

export default AgeCal;

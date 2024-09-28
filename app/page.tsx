"use client";

import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [data, setData] = useState([
    {
      id: 1,
      question: "What is the capital territory of Nigeria ?",
      options: [
        { id: "1x", selected: false, value: "Lagos"},
        {id: "2x", selected: false, value: "Federal Capital Territory"},
        { id: "3x", selected: false, value: "Port Harcourt"}
      ],
      correctOption: "Federal Capital Territory"
    },
    {
      id: 2,
      question: "What is Lagos state population ?",
      options: [
        {id: "5x", selected: false, value: "10 Million"},
        {id: "6x", selected: false, value: "5 Million"},
        {id: "7x", selected: false, value: "35 Million"}
      ],
      correctOption: "35 Million"
    },
    {
      id: 3,
      question: "Will Serenity be achieved ?",
      options: [
        { id: "8x",selected: false, value: "Yes"},
        {id: "9x", selected: false, value: "No"}
      ],
      correctOption: "No"
    },
  ]);

  const checkAnswer = (
    selectedOpt:string,
    correctAnswer:string,
    questionId:number,
    optionIndex:string
  ) => {
    // console.log('selected idx ', optionIndex)
    // data.forEach((cur:any) => {
    //   if(cur.id === questionId) {
    //     cur.options.forEach((opt:any, idx:number) => {
    //       opt.selected = idx === optionIndex ? true : false
    //     })
    //   }
    // });
    
    const arr = data;

    arr.forEach((cur) => {
        if(cur.id === questionId) {
          cur.options.forEach((opt) => {
            opt.selected = opt.id === optionIndex ? true : false;
            console.log(`${opt.value} ${opt.selected}`)
          })
        }
    });

    // setData(prev => {prev.forEach((cur) => {})})

    if(selectedOpt === correctAnswer) {
      setScore((prev) => prev + 1)
    } else {
      setScore((prev) => prev === 0 ? 0 : prev -1)
    }
  }

  const move = (forward:boolean) => {
    if(forward) {
      setCurrentQuestion((prev) => prev >= data.length ? prev - 1 : prev + 1);
    } else {
      setCurrentQuestion((prev) => prev === 0 ? prev : prev - 1);
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">

      <h1
        className="font-bold text-3xl mb-8"
      >
        Your score : {score}
      </h1>

      <div
        className="flex flex-col justify-center items-center border-2 border-slate-500 rounded-xl p-4 w-8/12"
      >
        <h3 className="mb-4 font-medium text-2xl">
          {data[currentQuestion].question}
        </h3>

       <div
        className="w-full px-6 mb-4"
       >
         {
            data[currentQuestion].options.map((cur) => (
              <div key={cur.id} className="mb-2 flex flex-row items-center">
                <input
                  className="cursor-pointer rounded-xl h-[18px] w-[18px]" 
                  type={"radio"} 
                  id={cur.value} 
                  checked={cur.selected} 
                  value={cur.value} 
                  onChange={() => checkAnswer(cur.value, data[currentQuestion].correctOption, data[currentQuestion].id, cur.id)}
                />
                <label className="cursor-pointer ml-2 text-lg font-normal" htmlFor={cur.value}>{cur.value}</label>
              </div>
            ))
          }
       </div>

       <div
        className="px-6 w-full flex flex-row justify-between items-center"
       >
        <button 
          onClick={() => move(false)}
          className="border-red-500 font-bold text-sm"
        >
            prev
        </button>

        <button
          onClick={() => move(true)}
          className="font-bold text-sm"
        >
            next
        </button>
       </div>

      </div>

    </div>
  );
}

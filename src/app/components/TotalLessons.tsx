"use client";
import { Lesson } from "@/generated/prisma";
import React, { useState, useTransition } from "react";

type LessonProps = {
  lesson: Lesson;
  lessonIds: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteLesson: (l: number) => void;
  showLessonOptions: boolean
  handleShowLessonOptions: () => void;
};

export default function DisplayTotalLessons({
  lesson,
  lessonIds,
  handleChange,
  handleDeleteLesson,
  showLessonOptions,
  handleShowLessonOptions,
}: LessonProps) {
  return (
    <div className="flex mb-4 gap-2">
      <ol
        onClick={() => handleShowLessonOptions()}
        className={`flex gap-2 p-1 relative hover:bg-orange-200 cursor-pointer ${
          lessonIds.includes(lesson.id.toString())
            ? "bg-[#71b572]"
            : "bg-transparent"
        }`}
      >
        <li className="w-36">{lesson.date.toDateString()}</li>
        <li className="w-12">Id: {lesson.id}</li>
      </ol>
      {showLessonOptions && (
        <div className="flex gap-2 items-center justify-center border rounded">
          <div className="px-2 border-r-1">
            <label
              htmlFor={`lesson-checkbox-${lesson.id}`}
              className="cursor-pointer"
            >
              {lessonIds.includes(lesson.id.toString()) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              )}
            </label>
            <input
              type="checkbox"
              id={`lesson-checkbox-${lesson.id}`}
              checked={lessonIds.includes(lesson.id.toString())}
              value={lesson.id}
              onChange={handleChange}
              className="hidden"
              name="lessonIds"
            />
          </div>

          <button
            onClick={(e) => handleDeleteLesson(lesson.id)}
            className="z-100 cursor-pointer pr-2"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

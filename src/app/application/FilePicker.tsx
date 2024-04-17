"use client";

import { ChangeEvent, ReactNode, useRef, useState } from "react";

interface IProps {
  children: ReactNode;
  onFiles: (files: File[]) => void;
}

const FilePicker = ({ children, onFiles }: IProps) => {
  // hooks
  const inputRef = useRef<HTMLInputElement | null>(null);

  // methods
  function handleAddFiles() {
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (fileList === null) {
      onFiles([]);
      return;
    }

    const fi: File[] = [];

    for (let i = 0; i < fileList.length; ++i) {
      const file = fileList.item(i);
      if (file) fi.push(file);
    }

    onFiles(fi);
  }

  return (
    <div className="w-[22rem] border border-slate-600 h-[30rem] rounded-md overflow-auto p-4 flex flex-col items-end gap-4">
      <button
        onClick={handleAddFiles}
        className="px-2 py-1 rounded-md bg-blue-600 text-sm hover:bg-blue-700 transition-colors"
      >
        Add Files
      </button>
      <input type="file" hidden ref={inputRef} multiple onChange={handleOnChange} />
      {children}
    </div>
  );
};

export default FilePicker;

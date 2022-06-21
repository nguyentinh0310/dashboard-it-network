import { userApi } from "api/userApi";
import React, { ChangeEvent, useRef, useState } from "react";

export interface SearchTermProps {
  onSubmit: Function;
}

const SearchTerm = ({ onSubmit }: SearchTermProps) => {
  const [keyword, setKeyword] = useState("");
  const typingTimeoutRef = useRef<any>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!onSubmit) return;
    // debounce search
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      const formValues = e.target.value;
      onSubmit?.(formValues);
    }, 500);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={keyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchTerm;

"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps<T extends string> {
  options: { value: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect<T extends string>({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (optionValue: T) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange([] as T[]);
  };

  const selectedLabels = value
    .map((v) => options.find((opt) => opt.value === v)?.label)
    .filter(Boolean);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value.length && "text-muted-foreground",
            className
          )}
        >
          <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
            {value.length === 0 ? (
              <span>{placeholder}</span>
            ) : value.length === 1 ? (
              <span>{selectedLabels[0]}</span>
            ) : (
              <>
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {selectedLabels[0]}
                </Badge>
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  +{value.length - 1}
                </Badge>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {value.length > 0 && (
              <X
                className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="max-h-64 overflow-auto p-4">
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded-sm px-2 py-1.5"
                onClick={() => handleSelect(option.value)}
              >
                <Checkbox
                  id={`multi-select-${option.value}`}
                  checked={value.includes(option.value)}
                  onCheckedChange={() => handleSelect(option.value)}
                />
                <label
                  htmlFor={`multi-select-${option.value}`}
                  className="flex-1 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

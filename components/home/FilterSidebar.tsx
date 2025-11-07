"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BUDGET_OPTIONS,
  REGION_OPTIONS,
  ENVIRONMENT_OPTIONS,
  SEASON_OPTIONS,
} from "@/lib/constants";
import { CityFilters, BudgetFilter, RegionFilter, EnvironmentFilter, SeasonFilter } from "@/types";

interface FilterSidebarProps {
  filters: CityFilters;
  onFiltersChange: (filters: CityFilters) => void;
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleBudgetChange = (value: BudgetFilter) => {
    onFiltersChange({ ...filters, budget: value });
  };

  const handleRegionChange = (value: RegionFilter) => {
    onFiltersChange({ ...filters, region: value });
  };

  const handleEnvironmentChange = (value: EnvironmentFilter, checked: boolean) => {
    const currentValues = filters.environment || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFiltersChange({ ...filters, environment: newValues });
  };

  const handleSeasonChange = (value: SeasonFilter, checked: boolean) => {
    const currentValues = filters.season || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFiltersChange({ ...filters, season: newValues });
  };

  const handleReset = () => {
    onFiltersChange({
      search: "",
      budget: undefined,
      region: "전체",
      environment: [],
      season: [],
    });
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "search") return value && value.length > 0;
    if (key === "budget") return value !== undefined;
    if (key === "region") return value && value !== "전체";
    return Array.isArray(value) && value.length > 0;
  }).length;

  return (
    <div className="w-full space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">필터</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            <X className="mr-1 h-4 w-4" />
            초기화 ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* 검색 */}
      <div>
        <label className="mb-2 block text-sm font-medium">🔍 검색</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="도시/지역..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 예산 */}
      <div>
        <label className="mb-2 block text-sm font-medium">💰 예산</label>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleBudgetChange(option.value)}
            >
              <div className="relative flex h-5 w-5 items-center justify-center">
                <div className="h-5 w-5 rounded-full border-2 border-gray-400 bg-white" />
                {filters.budget === option.value && (
                  <div className="absolute h-3 w-3 rounded-full bg-primary" />
                )}
              </div>
              <label className="cursor-pointer text-sm font-medium leading-none">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 지역 */}
      <div>
        <label className="mb-2 block text-sm font-medium">📍 지역</label>
        <div className="space-y-2">
          {REGION_OPTIONS.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleRegionChange(option.value)}
            >
              <div className="relative flex h-5 w-5 items-center justify-center">
                <div className="h-5 w-5 rounded-full border-2 border-gray-400 bg-white" />
                {(filters.region === option.value || (!filters.region && option.value === "전체")) && (
                  <div className="absolute h-3 w-3 rounded-full bg-primary" />
                )}
              </div>
              <label className="cursor-pointer text-sm font-medium leading-none">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 환경 */}
      <div>
        <label className="mb-2 block text-sm font-medium">🌿 환경</label>
        <div className="space-y-2">
          {ENVIRONMENT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`environment-${option.value}`}
                checked={filters.environment?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleEnvironmentChange(option.value, checked as boolean)
                }
              />
              <label
                htmlFor={`environment-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 최고 계절 */}
      <div>
        <label className="mb-2 block text-sm font-medium">🍂 최고 계절</label>
        <div className="space-y-2">
          {SEASON_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`season-${option.value}`}
                checked={filters.season?.includes(option.value) || false}
                onCheckedChange={(checked) =>
                  handleSeasonChange(option.value, checked as boolean)
                }
              />
              <label
                htmlFor={`season-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
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

  const handleEnvironmentChange = (values: EnvironmentFilter[]) => {
    onFiltersChange({ ...filters, environment: values });
  };

  const handleSeasonChange = (values: SeasonFilter[]) => {
    onFiltersChange({ ...filters, season: values });
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
        <Select value={filters.budget} onValueChange={handleBudgetChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="예산을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {BUDGET_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 지역 */}
      <div>
        <label className="mb-2 block text-sm font-medium">📍 지역</label>
        <Select value={filters.region || "전체"} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="지역을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {REGION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 환경 */}
      <div>
        <label className="mb-2 block text-sm font-medium">🌿 환경</label>
        <MultiSelect
          options={ENVIRONMENT_OPTIONS}
          value={filters.environment || []}
          onChange={handleEnvironmentChange}
          placeholder="환경을 선택하세요"
          className="w-full"
        />
      </div>

      {/* 최고 계절 */}
      <div>
        <label className="mb-2 block text-sm font-medium">🍂 최고 계절</label>
        <MultiSelect
          options={SEASON_OPTIONS}
          value={filters.season || []}
          onChange={handleSeasonChange}
          placeholder="계절을 선택하세요"
          className="w-full"
        />
      </div>
    </div>
  );
}

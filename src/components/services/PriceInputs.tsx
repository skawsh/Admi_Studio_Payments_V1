
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceInputsProps {
  basePrice: number;
  priceUnit: string;
  onBasePriceChange: (value: number) => void;
  onPriceUnitChange: (value: string) => void;
  index: number;
}

const PriceInputs: React.FC<PriceInputsProps> = ({
  basePrice,
  priceUnit,
  onBasePriceChange,
  onPriceUnitChange,
  index
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label htmlFor={`subservice-price-${index}`}>Price</Label>
        <Input
          id={`subservice-price-${index}`}
          type="text"
          placeholder="Enter price"
          value={basePrice === 0 ? "" : basePrice}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            onBasePriceChange(isNaN(numericValue) ? 0 : numericValue);
          }}
        />
      </div>
      <div>
        <Label htmlFor={`subservice-unit-${index}`}>Unit</Label>
        <Input
          id={`subservice-unit-${index}`}
          type="text"
          placeholder="Enter price"
          value={priceUnit}
          onChange={(e) => onPriceUnitChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceInputs;

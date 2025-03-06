
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
        <Label htmlFor={`subservice-price-${index}`}>Base Price</Label>
        <Input
          id={`subservice-price-${index}`}
          type="number"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => onBasePriceChange(parseFloat(e.target.value) || 0)}
        />
      </div>
      <div>
        <Label htmlFor={`subservice-unit-${index}`}>Price Unit</Label>
        <Input
          id={`subservice-unit-${index}`}
          placeholder="e.g. per kg, per piece"
          value={priceUnit}
          onChange={(e) => onPriceUnitChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceInputs;


import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <Label htmlFor={`subservice-unit-${index}`}>Price</Label>
        <Select
          value={priceUnit}
          onValueChange={onPriceUnitChange}
        >
          <SelectTrigger id={`subservice-unit-${index}`} className="bg-white">
            <SelectValue placeholder="Select price unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="per item">per item</SelectItem>
            <SelectItem value="per kg">per kg</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PriceInputs;

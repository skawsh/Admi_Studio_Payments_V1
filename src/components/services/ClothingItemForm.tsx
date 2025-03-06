
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { NewClothingItem } from "@/types/serviceTypes";

interface ClothingItemFormProps {
  newItem: NewClothingItem;
  onItemChange: (field: keyof NewClothingItem, value: string | number) => void;
  onAddItem: () => void;
  index: number;
}

const ClothingItemForm: React.FC<ClothingItemFormProps> = ({
  newItem,
  onItemChange,
  onAddItem,
  index,
}) => {
  return (
    <div className="mt-3 pt-3 border-t space-y-3">
      <h4 className="font-medium text-sm text-gray-700">Add Clothing Item</h4>
      <div>
        <Label htmlFor={`item-name-${index}`}>Item Name</Label>
        <Input
          id={`item-name-${index}`}
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => onItemChange("name", e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`standard-price-${index}`}>Standard Price</Label>
          <Input
            id={`standard-price-${index}`}
            type="number"
            placeholder="Standard Price"
            value={newItem.standardPrice}
            onChange={(e) => onItemChange("standardPrice", parseFloat(e.target.value) || 0)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`express-price-${index}`}>Express Price</Label>
          <Input
            id={`express-price-${index}`}
            type="number"
            placeholder="Express Price"
            value={newItem.expressPrice}
            onChange={(e) => onItemChange("expressPrice", parseFloat(e.target.value) || 0)}
            className="mt-1"
          />
        </div>
      </div>
      
      <Button
        type="button"
        onClick={onAddItem}
        variant="outline"
        className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Item
      </Button>
    </div>
  );
};

export default ClothingItemForm;

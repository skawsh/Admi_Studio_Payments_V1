
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { ClothingItem } from "@/types/serviceTypes";

interface ClothingItemBadgesProps {
  items: ClothingItem[];
  onRemoveItem: (itemIndex: number) => void;
}

const ClothingItemBadges: React.FC<ClothingItemBadgesProps> = ({
  items,
  onRemoveItem,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t">
      <Label className="mb-2 block">Clothing Items</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, itemIndex) => (
          <Badge 
            key={itemIndex} 
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
          >
            <span>{item.name}</span>
            <button 
              onClick={() => onRemoveItem(itemIndex)}
              className="ml-1 text-blue-400 hover:text-blue-600"
            >
              <Trash className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

// Add Label import at the top
import { Label } from "@/components/ui/label";

export default ClothingItemBadges;

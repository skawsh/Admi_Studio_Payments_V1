
import React from 'react';
import { Service } from '@/types/serviceTypes';
import { Button } from '@/components/ui/button';
import { Edit, Trash, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClothingItemSectionProps {
  services: Service[];
  expandedServices: Record<string, boolean>;
  expandedSubservices: Record<string, boolean>;
  onAddItem: (serviceId: string, subserviceId: string, item: any) => void;
}

const ClothingItemSection: React.FC<ClothingItemSectionProps> = ({
  services,
  expandedServices,
  expandedSubservices,
  onAddItem
}) => {
  const { toast } = useToast();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-lg mb-3 border-b pb-2">Clothing Items</h3>
      <div className="space-y-2">
        {services.map(service => (
          expandedServices[service.id] && service.subservices.map(subservice => (
            expandedSubservices[subservice.id] && (
              <React.Fragment key={`items-${subservice.id}`}>
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {service.name} &gt; {subservice.name}
                </div>
                {subservice.items.length > 0 ? (
                  subservice.items.map(item => (
                    <div 
                      key={item.id} 
                      className="border rounded-md p-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              toast({
                                title: "Coming Soon",
                                description: "Edit item functionality will be implemented soon.",
                                duration: 3000,
                              });
                            }}
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              toast({
                                title: "Coming Soon",
                                description: "Delete item functionality will be implemented soon.",
                                duration: 3000,
                              });
                            }}
                          >
                            <Trash className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-1 text-xs grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-500">Standard Price:</span>
                          <div className="font-semibold text-blue-700">₹{item.standardPrice}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Express Price:</span>
                          <div className="font-semibold text-blue-700">₹{item.expressPrice}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3 text-gray-500 border rounded-md">
                    No items added
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-1 mb-3"
                  onClick={() => onAddItem(service.id, subservice.id, {})}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </React.Fragment>
            )
          ))
        ))}
      </div>
    </div>
  );
};

export default ClothingItemSection;


import React from 'react';
import { Service, Subservice } from '@/types/serviceTypes';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Edit, Trash, PlusCircle } from 'lucide-react';

interface SubserviceSectionProps {
  services: Service[];
  expandedServices: Record<string, boolean>;
  expandedSubservices: Record<string, boolean>;
  onToggleSubservice: (serviceId: string, subserviceId: string) => void;
  onToggleSubserviceExpand: (subserviceId: string) => void;
  onEditSubservice: (subserviceId: string) => void;
  onDeleteSubservice: (subserviceId: string) => void;
  onAddSubservice: (serviceId: string) => void;
}

const SubserviceSection: React.FC<SubserviceSectionProps> = ({
  services,
  expandedServices,
  expandedSubservices,
  onToggleSubservice,
  onToggleSubserviceExpand,
  onEditSubservice,
  onDeleteSubservice,
  onAddSubservice
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-lg mb-3 border-b pb-2">Subservices</h3>
      <div className="space-y-2">
        {services.map(service => (
          expandedServices[service.id] && (
            <React.Fragment key={`sub-${service.id}`}>
              <div className="text-sm font-medium text-gray-500 mb-1">
                {service.name}
              </div>
              {service.subservices.map(subservice => (
                <div 
                  key={subservice.id} 
                  className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onToggleSubserviceExpand(subservice.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {expandedSubservices[subservice.id] ? (
                        <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className="font-medium">{subservice.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`enable-subservice-${subservice.id}`}
                        checked={subservice.enabled}
                        onCheckedChange={() => onToggleSubservice(service.id, subservice.id)}
                        className="data-[state=checked]:bg-emerald-500"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditSubservice(subservice.id);
                        }}
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSubservice(subservice.id);
                        }}
                      >
                        <Trash className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-1 text-xs grid grid-cols-2 gap-2">
                    {subservice.basePrice !== undefined && subservice.basePrice > 0 && (
                      <div>
                        <span className="text-gray-500">Price per KG:</span>
                        <div className="font-semibold text-blue-700">₹{subservice.basePrice}</div>
                      </div>
                    )}
                    {subservice.priceUnit && (
                      <div>
                        <span className="text-gray-500">Price per Item:</span>
                        <div className="font-semibold text-blue-700">₹{subservice.priceUnit}</div>
                      </div>
                    )}
                  </div>
                  <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-200">
                    {subservice.items.length} Items
                  </Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-1 mb-3"
                onClick={() => onAddSubservice(service.id)}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Subservice
              </Button>
            </React.Fragment>
          )
        ))}
      </div>
    </div>
  );
};

export default SubserviceSection;

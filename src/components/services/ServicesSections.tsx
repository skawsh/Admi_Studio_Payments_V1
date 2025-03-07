
import React from 'react';
import { Service, Subservice, ClothingItem } from '@/types/serviceTypes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Edit, Trash, PlusCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

interface ServicesSectionsProps {
  services: Service[];
  searchTerm: string;
  onAddItem: (serviceId: string, subserviceId: string, item: any) => void;
  onToggleService: (serviceId: string) => void;
  onToggleSubservice: (serviceId: string, subserviceId: string) => void;
}

const ServicesSections: React.FC<ServicesSectionsProps> = ({
  services,
  searchTerm,
  onAddItem,
  onToggleService,
  onToggleSubservice
}) => {
  const { toast } = useToast();
  const [expandedServices, setExpandedServices] = React.useState<Record<string, boolean>>({});
  const [expandedSubservices, setExpandedSubservices] = React.useState<Record<string, boolean>>({});

  // Filter services, subservices, and items based on search term
  const filteredServices = React.useMemo(() => {
    if (!searchTerm) return services;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return services.filter(service => {
      // Check if service name matches
      const serviceMatches = service.name.toLowerCase().includes(lowerCaseSearchTerm);
      
      // Check if any subservice matches
      const subserviceMatches = service.subservices.some(sub => 
        sub.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        // Check if any clothing item matches
        sub.items.some(item => item.name.toLowerCase().includes(lowerCaseSearchTerm))
      );
      
      return serviceMatches || subserviceMatches;
    });
  }, [services, searchTerm]);

  const toggleServiceExpand = (serviceId: string) => {
    setExpandedServices(prev => ({...prev, [serviceId]: !prev[serviceId]}));
  };

  const toggleSubserviceExpand = (subserviceId: string) => {
    setExpandedSubservices(prev => ({...prev, [subserviceId]: !prev[subserviceId]}));
  };

  const handleEditService = (serviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Edit service functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleDeleteService = (serviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Delete service functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleAddSubservice = (serviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Add subservice functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleEditSubservice = (subserviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Edit subservice functionality will be implemented soon.",
      duration: 3000,
    });
  };

  const handleDeleteSubservice = (subserviceId: string) => {
    toast({
      title: "Coming Soon",
      description: "Delete subservice functionality will be implemented soon.",
      duration: 3000,
    });
  };

  if (filteredServices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-4">
        <p className="text-gray-500">No services found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-lg mb-3 border-b pb-2">Services</h3>
          <div className="space-y-2">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleServiceExpand(service.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {expandedServices[service.id] ? (
                      <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                    )}
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`enable-service-${service.id}`}
                      checked={service.enabled}
                      onCheckedChange={() => onToggleService(service.id)}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditService(service.id);
                      }}
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteService(service.id);
                      }}
                    >
                      <Trash className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div className="mt-1">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {service.subservices.length} Subservices
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subservices Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-lg mb-3 border-b pb-2">Subservices</h3>
          <div className="space-y-2">
            {filteredServices.map(service => (
              expandedServices[service.id] && (
                <React.Fragment key={`sub-${service.id}`}>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    {service.name}
                  </div>
                  {service.subservices.map(subservice => (
                    <div 
                      key={subservice.id} 
                      className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleSubserviceExpand(subservice.id)}
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
                              handleEditSubservice(subservice.id);
                            }}
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSubservice(subservice.id);
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
                    onClick={() => handleAddSubservice(service.id)}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Subservice
                  </Button>
                </React.Fragment>
              )
            ))}
          </div>
        </div>

        {/* Clothing Items Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-lg mb-3 border-b pb-2">Clothing Items</h3>
          <div className="space-y-2">
            {filteredServices.map(service => (
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
      </div>
    </div>
  );
};

export default ServicesSections;

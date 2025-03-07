
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  getStudioById, 
  addServiceToStudio, 
  addSubserviceToService, 
  addItemToSubservice,
  toggleServiceEnabled,
  toggleSubserviceEnabled
} from '@/data/mockServiceData';
import ServicesSections from '@/components/services/ServicesSections';
import SearchBox from '@/components/services/SearchBox';
import AddServiceModal from '@/components/services/AddServiceModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/ui/PageHeader';
import { ClothingItem, Service, Subservice } from '@/types/serviceTypes';

const StudioServices: React.FC = () => {
  const { studioId } = useParams<{ studioId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const studio = getStudioById(studioId || '');

  if (!studio) {
    return (
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500">Studio not found</h1>
          <p className="text-gray-600 mt-2">The requested studio could not be found.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/studios')}
            variant="outline"
          >
            Back to Studios
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const handleAddService = () => {
    setAddServiceModalOpen(true);
  };

  const handleGoBack = () => {
    navigate(`/studios/details/${studioId}`);
  };

  const handleAddServiceSubmit = (serviceName: string, subservices: Omit<Subservice, "id">[]) => {
    try {
      const newService = addServiceToStudio(studioId || '', {
        name: serviceName,
        subservices: [],
        enabled: true
      });
      
      subservices.forEach(subservice => {
        addSubserviceToService(studioId || '', newService.id, subservice);
      });

      toast({
        title: "Success",
        description: "Service added successfully",
        duration: 3000,
      });
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleAddItem = (serviceId: string, subserviceId: string, newItem: Omit<ClothingItem, "id">) => {
    try {
      addItemToSubservice(studioId || '', serviceId, subserviceId, newItem);
      
      toast({
        title: "Success",
        description: "Item added successfully",
        duration: 3000,
      });
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleToggleService = (serviceId: string) => {
    try {
      toggleServiceEnabled(studioId || '', serviceId);
      toast({
        title: "Success",
        description: "Service status updated",
        duration: 3000,
      });
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleToggleSubservice = (serviceId: string, subserviceId: string) => {
    try {
      toggleSubserviceEnabled(studioId || '', serviceId, subserviceId);
      toast({
        title: "Success",
        description: "Subservice status updated",
        duration: 3000,
      });
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subservice status",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader
          title={`${studio.name} - Services`}
          subtitle="Manage all laundry services offered by this studio"
          backButton={
            <Button 
              onClick={handleGoBack} 
              variant="back" 
              size="icon"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          }
        >
          <Button onClick={handleAddService} variant="service">
            <Plus className="h-4 w-4 mr-1" />
            Add Service
          </Button>
        </PageHeader>

        <div className="mt-6">
          <SearchBox 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search services, subservices or items..."
          />
          
          <ServicesSections 
            key={refreshKey}
            services={studio.services}
            searchTerm={searchTerm}
            onAddItem={handleAddItem}
            onToggleService={handleToggleService}
            onToggleSubservice={handleToggleSubservice}
          />
        </div>
      </div>

      <AddServiceModal 
        isOpen={addServiceModalOpen}
        onClose={() => setAddServiceModalOpen(false)}
        onAddService={handleAddServiceSubmit}
      />
    </AdminLayout>
  );
};

export default StudioServices;

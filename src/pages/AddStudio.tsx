import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, PlusCircle } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AddServiceModal from '@/components/services/AddServiceModal';
import { addServiceToStudio, addSubserviceToService } from '@/data/mockServiceData';
import { Subservice } from '@/types/serviceTypes';

const studioFormSchema = z.object({
  name: z.string().min(1, "Studio name is required"),
  ownerName: z.string().min(1, "Owner first name is required"),
  ownerLastName: z.string().optional(),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  secondaryNumber: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  
  numberOfEmployees: z.coerce.number().int().nonnegative().optional(),
  dailyCapacity: z.coerce.number().int().nonnegative().optional(),
  specialEquipment: z.string().optional(),
  washCategory: z.enum(['standard', 'express', 'both']).default('both'),
  
  businessRegistrationNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
  priceAdjustmentPercentage: z.coerce.number().int().optional(),
  
  accountNumber: z.string().optional(),
  accountHolderName: z.string().optional(),
  bankName: z.string().optional(),
  ifscCode: z.string().optional(),
  branchName: z.string().optional(),
  upiId: z.string().optional(),
  paymentSchedule: z.enum(['daily', 'weekly']).default('daily'),
});

type StudioFormValues = z.infer<typeof studioFormSchema>;

const AddStudio: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);
  
  const form = useForm<StudioFormValues>({
    resolver: zodResolver(studioFormSchema),
    defaultValues: {
      name: '',
      ownerName: '',
      ownerLastName: '',
      contactNumber: '',
      secondaryNumber: '',
      email: '',
      
      street: '',
      city: '',
      state: '',
      postalCode: '',
      latitude: '',
      longitude: '',
      
      numberOfEmployees: 0,
      dailyCapacity: 0,
      specialEquipment: '',
      washCategory: 'both',
      
      businessRegistrationNumber: '',
      gstNumber: '',
      panNumber: '',
      openingTime: '',
      closingTime: '',
      priceAdjustmentPercentage: 0,
      
      accountNumber: '',
      accountHolderName: '',
      bankName: '',
      ifscCode: '',
      branchName: '',
      upiId: '',
      paymentSchedule: 'daily',
    }
  });

  const handleAddService = () => {
    setAddServiceModalOpen(true);
  };

  const handleAddServiceSubmit = (serviceName: string, subservices: Omit<Subservice, "id">[]) => {
    try {
      const tempStudioId = "temp-studio-id";
      const newService = addServiceToStudio(tempStudioId, {
        name: serviceName,
        subservices: [],
        enabled: true
      });
      
      subservices.forEach(subservice => {
        addSubserviceToService(tempStudioId, newService.id, subservice);
      });

      toast({
        title: "Success",
        description: "Service added successfully",
        duration: 3000,
      });
      
      setAddServiceModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleGoBack = () => {
    navigate('/studios');
  };

  const onSubmit = (data: StudioFormValues) => {
    console.log("Form data:", data);
    
    toast({
      title: "Studio added",
      description: `${data.name} has been added successfully`,
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate('/studios');
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleGoBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add New Studio</h1>
              <p className="text-sm text-gray-500">Create a new laundry studio</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="service" 
              onClick={handleAddService}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Services
            </Button>
            <button
              onClick={form.handleSubmit(onSubmit)}
              className="flex items-center px-4 py-2 bg-admin-primary text-white rounded-md hover:bg-opacity-90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Studio
            </button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner First Name <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="ownerLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Studio Name <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Studio Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Number <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Primary Contact Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="secondaryNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Secondary Contact Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input placeholder="Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input placeholder="Latitude" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input placeholder="Longitude" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="businessRegistrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Registration Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Business Registration Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST/VAT Number</FormLabel>
                          <FormControl>
                            <Input placeholder="GST Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <FormControl>
                            <Input placeholder="PAN Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="openingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opening Time</FormLabel>
                          <FormControl>
                            <Input placeholder="09:00 AM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="closingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Closing Time</FormLabel>
                          <FormControl>
                            <Input placeholder="09:00 PM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="priceAdjustmentPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Adjustment %</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Studio Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="numberOfEmployees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Employees</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Number of Employees" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="dailyCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Capacity (In KG's)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Daily Capacity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="specialEquipment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Equipment</FormLabel>
                          <FormControl>
                            <Input placeholder="Special Equipment" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="washCategory"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select Wash Category</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="standard" id="wash-standard" />
                                <Label htmlFor="wash-standard">Standard Wash</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="express" id="wash-express" />
                                <Label htmlFor="wash-express">Express Wash</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="both" id="wash-both" />
                                <Label htmlFor="wash-both">Both</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Account Holder Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Bank Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Account Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input placeholder="IFSC Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="branchName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Branch Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="upiId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UPI ID</FormLabel>
                          <FormControl>
                            <Input placeholder="UPI ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="paymentSchedule"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select Payment Schedule</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="weekly" id="schedule-weekly" />
                                <Label htmlFor="schedule-weekly">Weekly Payment</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="daily" id="schedule-daily" />
                                <Label htmlFor="schedule-daily">Daily Payment</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleGoBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-admin-primary text-white rounded-md hover:bg-opacity-90"
              >
                Save Studio
              </button>
            </div>
          </form>
        </Form>
      </div>

      <AddServiceModal 
        isOpen={addServiceModalOpen}
        onClose={() => setAddServiceModalOpen(false)}
        onAddService={handleAddServiceSubmit}
      />
    </AdminLayout>
  );
};

export default AddStudio;

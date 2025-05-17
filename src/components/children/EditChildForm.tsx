
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useChild, Child } from '@/contexts/ChildContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  first_name: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  last_name: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  age: z.coerce.number().min(1, { message: 'Age must be a positive number' }),
  grade_id: z.string().optional().transform(val => val ? Number(val) : null),
});

type FormValues = z.infer<typeof formSchema>;

interface EditChildFormProps {
  child: Child;
  onSuccess?: () => void;
}

const EditChildForm: React.FC<EditChildFormProps> = ({ child, onSuccess }) => {
  const { updateChild } = useChild();
  
  // Fetch grades for dropdown
  const { data: grades = [] } = useQuery({
    queryKey: ['grades'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('grades')
        .select('id, display_name')
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: child.first_name,
      last_name: child.last_name,
      age: child.age || undefined,
      grade_id: child.grade_id?.toString() || '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    await updateChild(child.id, {
      first_name: values.first_name,
      last_name: values.last_name,
      age: values.age,
      grade_id: values.grade_id,
    });
    
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter age" 
                  type="number" 
                  min="1" 
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="grade_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {grades.map((grade: { id: number; display_name: string }) => (
                    <SelectItem key={grade.id} value={grade.id.toString()}>
                      {grade.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default EditChildForm;

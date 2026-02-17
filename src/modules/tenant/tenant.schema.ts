import z from 'zod';

export const createTenantSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z
      .string()
      .min(1)
      .regex(
        /^[a-z0-9-]+$/,
        'Slug can only contain lowercase letters, numbers, and dashes'
      ),
    industry: z.string().optional(),
    logo_url: z.url().optional(),
  }),
});

export const updateTenantSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    industry: z.string().optional(),
    logo_url: z.url().optional(),
    is_active: z.boolean().optional(),
  }),
  params: z.object({
    id: z.uuid(),
  }),
});

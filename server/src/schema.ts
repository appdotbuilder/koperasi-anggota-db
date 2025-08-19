import { z } from 'zod';

// Member schema with proper type handling
export const memberSchema = z.object({
  id: z.number(),
  cif_number: z.string(), // Unique identifier for cooperative member
  full_name: z.string(),
  address: z.string(),
  member_since: z.coerce.date(), // Date when became a member
  phone_number: z.string(),
  birth_place: z.string(),
  birth_date: z.coerce.date(),
  heir: z.string().nullable(), // Heir information, can be null
  occupation: z.string(),
  education: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Member = z.infer<typeof memberSchema>;

// Input schema for creating members
export const createMemberInputSchema = z.object({
  cif_number: z.string().min(1, "CIF number is required"),
  full_name: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  member_since: z.coerce.date(),
  phone_number: z.string().min(1, "Phone number is required"),
  birth_place: z.string().min(1, "Birth place is required"),
  birth_date: z.coerce.date(),
  heir: z.string().nullable(), // Can be explicitly null
  occupation: z.string().min(1, "Occupation is required"),
  education: z.string().min(1, "Education is required")
});

export type CreateMemberInput = z.infer<typeof createMemberInputSchema>;

// Input schema for updating members
export const updateMemberInputSchema = z.object({
  id: z.number(),
  cif_number: z.string().min(1).optional(),
  full_name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  member_since: z.coerce.date().optional(),
  phone_number: z.string().min(1).optional(),
  birth_place: z.string().min(1).optional(),
  birth_date: z.coerce.date().optional(),
  heir: z.string().nullable().optional(), // Can be null or undefined
  occupation: z.string().min(1).optional(),
  education: z.string().min(1).optional()
});

export type UpdateMemberInput = z.infer<typeof updateMemberInputSchema>;

// Schema for getting member by ID
export const getMemberInputSchema = z.object({
  id: z.number()
});

export type GetMemberInput = z.infer<typeof getMemberInputSchema>;

// Schema for getting member by CIF number
export const getMemberByCifInputSchema = z.object({
  cif_number: z.string()
});

export type GetMemberByCifInput = z.infer<typeof getMemberByCifInputSchema>;

// Schema for deleting member
export const deleteMemberInputSchema = z.object({
  id: z.number()
});

export type DeleteMemberInput = z.infer<typeof deleteMemberInputSchema>;
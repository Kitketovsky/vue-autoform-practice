import z from 'zod'

enum Sports {
  Football = 'Football/Soccer',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Hockey = 'Hockey (Ice)',
  None = "I don't like sports",
}

export const schema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(10, {
      message: '10 max',
    })
    .optional()
    .describe('Username Label'),

  password: z
    .string({
      error: 'Password is required.',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),

  favouriteNumber: z.coerce
    .number({
      error: 'Favourite number must be a number.',
    })
    .min(1, {
      message: 'Favourite number must be at least 1.',
    })
    .max(10, {
      message: 'Favourite number must be at most 10.',
    })
    .default(1)
    .optional(),

  acceptTerms: z.boolean().refine((value) => value, {
    message: 'You must accept the terms and conditions.',
    path: ['acceptTerms'],
  }),

  sendMeMails: z.boolean().optional(),

  // birthday: z.coerce.date().optional(),

  color: z.enum(['red', 'green', 'blue']).optional(),

  // Another enum example
  marshmallows: z.enum(['not many', 'a few', 'a lot', 'too many']),

  // Native enum example
  sports: z.enum(Sports).describe('What is your favourite sport?'),

  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    })
    .optional(),

  customParent: z.string().optional(),

  file: z.file().optional(),
})

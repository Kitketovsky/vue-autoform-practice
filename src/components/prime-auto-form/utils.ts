import type z from 'zod'

export function getInputFormTypeDefaults(input: z.core.JSONSchema.JSONSchema) {
  const { type, format, enum: enums } = input

  if (type === 'string' && format === 'binary') return { type: 'file', default: '' }
  if (type === 'string' && !format) return { type: 'string', default: '' }
  if (type === 'string' && enums) return { type: 'select', default: enums[0] }
  if (type === 'boolean') return { type: 'boolean', default: false }
  if (type === 'integer') return { type: 'number', default: 0 }
  if (type === 'number') return { type: 'number', default: 0 }

  console.warn(`getFormTypeDefaults: Unhandled '${type}' type.`)

  return { type, default: '' }
}

type InitialFormStateValues = ReturnType<typeof getInputFormTypeDefaults>['default']

export function getInitialFormState(json: z.core.JSONSchema.JSONSchema) {
  if (!json.properties) {
    throw new Error('No fields has been found in schema')
  }

  const initialState: Record<string, InitialFormStateValues> = {}

  Object.entries(json.properties).forEach(([key, value]) => {
    const tValue = value as z.core.JSONSchema.JSONSchema
    initialState[key] =
      (tValue.default as InitialFormStateValues) ?? getInputFormTypeDefaults(tValue).default
  })

  return initialState
}

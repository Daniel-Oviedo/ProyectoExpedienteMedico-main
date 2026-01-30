import { useState, useCallback } from 'react'

/**
 * Hook personalizado para validación de formularios
 * Maneja estado de errores y validación de campos
 */

export function useFormValidation(initialValues = {}, onSubmit) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])

  const validateField = useCallback((name, value, rules = {}) => {
    let error = ''

    if (rules.required && !value) {
      error = `${name} es requerido`
    } else if (rules.minLength && value.length < rules.minLength) {
      error = `${name} debe tener al menos ${rules.minLength} caracteres`
    } else if (rules.maxLength && value.length > rules.maxLength) {
      error = `${name} no puede exceder ${rules.maxLength} caracteres`
    } else if (rules.pattern && !rules.pattern.test(value)) {
      error = `${name} tiene un formato inválido`
    } else if (rules.match && value !== rules.match) {
      error = `${name} no coincide`
    }

    return error
  }, [])

  const validateForm = useCallback((validationRules = {}) => {
    const newErrors = {}

    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      const error = validateField(fieldName, formData[fieldName], rules)
      if (error) newErrors[fieldName] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  const handleSubmit = useCallback(async (e, validationRules = {}) => {
    e.preventDefault()
    
    if (!validateForm(validationRules)) {
      return
    }

    if (onSubmit) {
      setIsSubmitting(true)
      try {
        await onSubmit(formData)
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [formData, validateForm, onSubmit])

  const resetForm = useCallback(() => {
    setFormData(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const setFieldValue = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm
  }
}

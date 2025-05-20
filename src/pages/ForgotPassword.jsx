import { useForgotPasswordMutation } from '@/service/Auth.services'
import { ForgotPasswordSchema } from '@/Validation/ForgotPasswordValidation'
import { useFormik } from 'formik'
import React from 'react'

const ForgotPassword = () => {

    const [ForgotPassword, {isLoading} ] = useForgotPasswordMutation()
    
    const { handleSubmit, handleBlur, handleChange, resetForm, touched, errors, values } = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: ForgotPasswordSchema,
        onSubmit: async(values) => {
          try {
              const res = await ForgotPassword(values).unwrap()
              console.log(res)
              resetForm()
          } catch (error) {
            console.log(error)
          }
        }
    })
    return (
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12 shadow-lg rounded-lg">
            <div className="w-full max-w-md">
                <h2 className="text-4xl font-semibold text-gray-900 mb-8 text-center">
                    Forgot  password ?
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="you@example.com"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                        />
                        {touched.email && errors.email && (
                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg hover:opacity-90 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ForgotPassword
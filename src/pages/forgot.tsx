import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { Form } from '../components/Form'
import { supabase } from '../lib/supabaseClient'

type IForm = {
  email: string
}

const Forgot: NextPage = () => {
  const { register, handleSubmit } = useForm<IForm>()

  const handleResetPassword = ({ email }: IForm) => {
    supabase.auth.api.resetPasswordForEmail(email)
  }

  const inputList = [{ type: 'email', name: 'email', ref: register }]

  return (
    <Form onSubmit={handleSubmit(handleResetPassword)} inputList={inputList} buttonText="再設定" />
  )
}

export default Forgot

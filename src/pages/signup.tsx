import { NextPage } from '~/node_modules/next'
import { useForm } from 'react-hook-form'
import { Form } from '../components/Form'
import { supabase } from '../lib/supabaseClient'

type IForm = {
  email: string
  password: string
  passwordConf: string
}

const Signup: NextPage = () => {
  const { register, handleSubmit } = useForm<IForm>()
  const handleSignup = ({ email, password }: IForm) => {
    supabase.auth.signUp({ email, password })
  }

  const inputList = [
    { type: 'email', name: 'email', ref: register },
    { type: 'password', name: 'password', ref: register },
    { type: 'password', name: 'passwordConf', ref: register },
  ]

  return (
    <div>
      <Form onSubmit={handleSubmit(handleSignup)} inputList={inputList} buttonText="登録" />
    </div>
  )
}

export default Signup

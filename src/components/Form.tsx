import { FC } from 'react'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

type IProps = {
  onSubmit: any
  buttonText: string
  inputList: {
    name: string
    ref: any
    type: string
  }[]
}

export const Form: FC<IProps> = ({ onSubmit, buttonText, inputList }) => {
  return (
    <form onSubmit={onSubmit}>
      {inputList.map((props) => (
        <FormControl id={props.name}>
          <FormLabel key={props.name}>
            <span>{props.name}</span>
            <Input {...props} />
          </FormLabel>
        </FormControl>
      ))}
      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

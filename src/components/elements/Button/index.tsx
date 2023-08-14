import React from 'react'
import { Button } from '@chakra-ui/react'

export const SWButton: React.FC = () => {
  return (
    <Button
      onClick={() => console.log('clicked')}
      colorScheme="teal"
      variant="solid"
    >
      Login
    </Button>
  )
}
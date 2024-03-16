import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

  import React from 'react'
  
  function SuccessAlert(message?: string) {
    return (
    <Alert status='success'>
        <AlertIcon />
        <AlertTitle>Ação Realizada com sucesso</AlertTitle>
        { message && <AlertDescription>{message}</AlertDescription> }
      </Alert>
    )
  }
  
  export default SuccessAlert
  
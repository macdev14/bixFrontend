import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

  import React from 'react'
  
  function ErrorAlert(message : string) {
    return (
    <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Um Erro ocorreu</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }
  
  export default ErrorAlert
  
import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./common/context/authContext"
import OtherRoutes from "./routes/OtherRoutes"

export const App = () => (
 
  <ChakraProvider theme={theme}>
{/*    @ts-ignore*/}
      <AuthProvider>  
    <AppRoutes/>
    </AuthProvider>
  </ChakraProvider>

)

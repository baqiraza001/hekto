import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import SnackBar from "./components/library/SnackBar"
import SignIn from "./components/auth/SignIn"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"

function AppPublic() {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <SnackBar />
      <Routes>
          <Route path="/admin/signin" Component={SignIn} />
          <Route path="/admin/forgot-password" Component={ForgotPassword} />
          <Route path="/admin/reset-password/" Component={ResetPassword} />
          <Route path="/admin/reset-password/:resetCode" Component={ResetPassword} />
      </Routes>
    </Box>
  )
}

export default AppPublic
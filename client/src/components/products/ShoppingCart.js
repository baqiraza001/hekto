import { Box, Button, Checkbox, Container, Grid, TextField, Typography } from "@mui/material"
import shoppingCart1 from "../../static/images/cart/shopingCart1.png"
import shoppingCart2 from "../../static/images/cart/shopingCart2.png"
import shoppingCart3 from "../../static/images/cart/shopingCart3.png"
import shoppingCart4 from "../../static/images/cart/shopingCart4.png"
import shoppingCart5 from "../../static/images/cart/shopingCart5.png"
import BreadCrumbs from "../common/products/BreadCrumbs"
const ShoppingCart = () => {

  const breadCrumbs = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ]

  return (
    <Box>
      <Container maxWidth={'xl'} disableGutters sx={{ 'background': 'var(--bread-crumbs)' }}  >
        <BreadCrumbs breadCrumbs={breadCrumbs} active={"Shipping Cart"} />
      </Container>
      <Container maxWidth={"md"}>
        <Grid container mt={9} mb={9}  >
          <Grid item md={8} xs={12}>
            <Grid item md={12} mb={6} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
              <Grid item md={5} xs={5} display={"flex"} sx={{ justifyContent: { md: "space-between", xs: "center" } }} >
                <Typography color="#1D3178" fontSize={"20px"} fontFamily={"var(--josefin)"} lineHeight={"23px"}   >Product</Typography>
              </Grid>
              <Grid item md={2} display={"flex"} justifyContent={"space-between"} >
                <Typography color="#1D3178" fontSize={"20px"} fontFamily={"var(--josefin)"} lineHeight={"23px"}  >Price</Typography>
              </Grid>
              <Grid item md={2} display={"flex"} justifyContent={"space-between"} >
                <Typography color="#1D3178" fontSize={"20px"} fontFamily={"var(--josefin)"} lineHeight={"23px"}  >Quantity</Typography>
              </Grid>
              <Grid item md={2} display={"flex"} justifyContent={"space-between"} >
                <Typography color="#1D3178" fontSize={"20px"} fontFamily={"var(--josefin)"} lineHeight={"23px"}  >Total</Typography>
              </Grid>
            </Grid>
            <Grid item md={12} display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={1} pb={1} borderBottom={"1px solid #E1E1E4"} >
              <Grid item md={5} display={"flex"}  >
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                  <Box width={'40%'} >
                    <img src={shoppingCart1} alt="img1" width={"100%"} />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'space-evenly'} >
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"}  >Ut diam consequat</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Color : Brown</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Size : XL</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$ 32.00</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box display={"flex"} width={"51px"} height={"15px"} sx={{ "backgroundColor": "#F0EFF2" }} justifyContent={"space-evenly"} >
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2", cursor: 'pointer' }} >-</button>
                    <span style={{ "border": "0px", "backgroundColor": "#F0EFF2", "width": "14px", "height": "15px", "display": "block", "textAlign": "center", "fontSize": "13px" }} >1</span>
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2", cursor: 'pointer' }} >+</button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$219.00</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={1} pb={1} borderBottom={"1px solid #E1E1E4"} >
              <Grid item md={5} display={"flex"}  >
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                  <Box width={'40%'} >
                    <img src={shoppingCart2} alt="img1" width={"100%"} />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'space-evenly'} >
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"}  >Ut diam consequat</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Color : Brown</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Size : XL</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$ 32.00</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box display={"flex"} width={"51px"} height={"15px"} sx={{ "backgroundColor": "#F0EFF2" }} justifyContent={"space-evenly"} >
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >-</button>
                    <span style={{ "border": "0px", "backgroundColor": "#F0EFF2", "width": "14px", "height": "15px", "display": "block", "textAlign": "center", "fontSize": "13px" }} >1</span>
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >+</button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$219.00</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={1} pb={1} borderBottom={"1px solid #E1E1E4"} >
              <Grid item md={5} display={"flex"}  >
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                  <Box width={'40%'} >
                    <img src={shoppingCart3} alt="img1" width={"100%"} />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'space-evenly'} >
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"}  >Ut diam consequat</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Color : Brown</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Size : XL</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$ 32.00</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box display={"flex"} width={"51px"} height={"15px"} sx={{ "backgroundColor": "#F0EFF2" }} justifyContent={"space-evenly"} >
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >-</button>
                    <span style={{ "border": "0px", "backgroundColor": "#F0EFF2", "width": "14px", "height": "15px", "display": "block", "textAlign": "center", "fontSize": "13px" }} >1</span>
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >+</button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$219.00</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={1} pb={1} borderBottom={"1px solid #E1E1E4"} >
              <Grid item md={5} display={"flex"}  >
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                  <Box width={'40%'} >
                    <img src={shoppingCart4} alt="img1" width={"100%"} />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'space-evenly'} >
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"}  >Ut diam consequat</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Color : Brown</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Size : XL</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$ 32.00</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box display={"flex"} width={"51px"} height={"15px"} sx={{ "backgroundColor": "#F0EFF2" }} justifyContent={"space-evenly"} >
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >-</button>
                    <span style={{ "border": "0px", "backgroundColor": "#F0EFF2", "width": "14px", "height": "15px", "display": "block", "textAlign": "center", "fontSize": "13px" }} >1</span>
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >+</button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$219.00</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={1} pb={1} borderBottom={"1px solid #E1E1E4"} >
              <Grid item md={5} display={"flex"}  >
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                  <Box width={'40%'} >
                    <img src={shoppingCart5} alt="img1" width={"100%"} />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'space-evenly'} >
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"}  >Ut diam consequat</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Color : Brown</Typography>
                    <Typography color="#000000" fontSize={"14px"} fontFamily={"var(--josefin)"} lineHeight={"16px"} >Size : XL</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$ 32.00</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box display={"flex"} width={"51px"} height={"15px"} sx={{ "backgroundColor": "#F0EFF2" }} justifyContent={"space-evenly"} >
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >-</button>
                    <span style={{ "border": "0px", "backgroundColor": "#F0EFF2", "width": "14px", "height": "15px", "display": "block", "textAlign": "center", "fontSize": "13px" }} >1</span>
                    <button style={{ "border": "0px", "backgroundColor": "#F0EFF2" }} >+</button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={2} >
                <Box display={"flex"} >
                  <Box>
                    <Typography>$219.00</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} sx={{ 'marginTop': { xs: '20px', md: "40px" } }} >
              <Box display={"flex"} justifyContent={"space-between"} >
                <Button variant='contained' style={{ 'backgroundColor': 'var(--pink)', 'borderRadius': 0, 'padding': '6px 30px', 'fontFamily': 'Josefin Sans', 'fontSize': '16px', 'letterSpacing': '0.02em' }} >Update Cart</Button>
                <Button variant='contained' style={{ 'backgroundColor': 'var(--pink)', 'borderRadius': 0, 'padding': '6px 30px', 'fontFamily': 'Josefin Sans', 'fontSize': '16px', 'letterSpacing': '0.02em' }} >Clear Cart</Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} sx={{ 'marginTop': { xs: '30px', md: "0px" } }} display={"flex"} flexDirection={"column"} >
            <Grid item md={12} >
              <Box mb={4} display={"flex"} justifyContent={"center"} >
                <Typography color="#1D3178" fontFamily={"var(--josefin)"} fontSize={"20px"} >Cart Totals</Typography>
              </Box>
              <Box sx={{ "backgroundColor": "#F4F4FC" }} p={3} pb={0} >
                <Box mb={5} display={"flex"} justifyContent={"space-around"} borderBottom={"2px solid #E8E6F1"} >
                  <Typography fontSize={"16px"} fontFamily={"var(--lato)"} color="#1D3178" fontWeight={600} lineHeight={"20px"} >Subtotals :</Typography>
                  <Typography fontSize={"16px"} fontFamily={"var(--lato)"} color="#1D3178" fontWeight={600} >$219.00</Typography>
                </Box>
                <Box mb={5} display={"flex"} justifyContent={"space-around"} borderBottom={"2px solid #E8E6F1"} >
                  <Typography fontSize={"16px"} fontFamily={"var(--lato)"} color="#1D3178" fontWeight={600} lineHeight={"20px"} >Totals :</Typography>
                  <Typography fontSize={"16px"} fontFamily={"var(--lato)"} color="#1D3178" fontWeight={600} >$325.00</Typography>
                </Box>
                <Box mb={4} display={"flex"} flexDirection={'column'}   >
                  <Box mb={3} display={"flex"} alignItems={"center"} >
                    <Checkbox size="small" color="success" defaultChecked />
                    <Typography fontFamily={"var(--josefin)"} fontSize={"10px"} >Shipping & taxes calculated at checkout</Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}  >
                    <Button variant="contained" style={{ "backgroundColor": "#19D16F", "width": "100%", "color": "white", "fontSize": "14px", "fontFamily": "var(--josefin)", "fontWeight": "700", "fontStyle": "normal", marginBottom: '20px' }} >Proceed To Checkout</Button>
                  </Box>
                </Box>

              </Box>
            </Grid>
            <Grid item md={12} >
              <Box mb={4} display={"flex"} justifyContent={"center"} >
                <Typography color="#1D3178" fontFamily={"var(--josefin)"} fontSize={"20px"} >Calculate Shopping</Typography>
              </Box>
              <Box sx={{ "backgroundColor": "#F4F4FC" }} p={3} pb={0} >
                <Box mb={1}>
                  <TextField fullWidth style={{ "borderBottom": "2px solid #E8E6F1" }} label="Bangladesh" variant="standard" />
                </Box>
                <Box mb={1} >
                  <TextField fullWidth style={{ "borderBottom": "2px solid #E8E6F1" }} label="Mirpur Dhaka - 1200" variant="standard" />
                </Box>
                <Box mb={1}>
                  <TextField fullWidth style={{ "borderBottom": "2px solid #E8E6F1" }} label="Postal Code" variant="standard" />
                </Box>
                <Box mt={4} display={"flex"} flexDirection={'column'}   >
                  <Box mb={2} display={"flex"} alignItems={"center"}  >
                    <Button variant="contained" style={{ "backgroundColor": "#19D16F", "width": "100%", "color": "white", "fontSize": "14px", "fontFamily": "var(--josefin)", "fontWeight": "700", "fontStyle": "normal" }} >Proceed To Checkout</Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ShoppingCart
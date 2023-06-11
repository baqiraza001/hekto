import { Box, Button, Container, Typography } from "@mui/material";
import { themeStyles } from "../../../styles";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ breadCrumbs, active = 'Active Text Here', title="" }) => {
  return (
    <Container maxWidth={"md"}>
      <Box sx={{ ...themeStyles.breadcrumbsBox }}>
        <Box>
          <Typography sx={{ ...themeStyles.breaCrumbsHeading }}>
            {title}
          </Typography>
        </Box>
        <Box>
          {breadCrumbs.map((obj, index) => (
            <Button style={themeStyles.navbarMenu} key={index}>
              <Link
                style={{ ...themeStyles.breaCrumbsLink, color: "black" }}
                to={obj.path}
              >
                {obj.label}.
              </Link>
            </Button>
          ))}
          <Button style={themeStyles.navbarMenu}>
            <Link style={{ ...themeStyles.breaCrumbsLink }}>
              {active}
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BreadCrumbs;

import { h } from "preact";
import { Card, CardContent, Typography } from "@mui/material";
import { route } from "preact-router";

const InstitutionCard = ({ institution }) => {
  const handleCardClick = () => {
    route(`/institution/${institution.id}`);
  };

  return (
    <Card variant="outlined" onClick={handleCardClick} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Typography variant="h6">{institution.name}</Typography>
        <Typography variant="body2">ID: {institution.id}</Typography>
      </CardContent>
    </Card>
  );
};

export default InstitutionCard;

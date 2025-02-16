import { h } from "preact";
import { Card, CardContent, Typography } from "@mui/material";
import { route } from "preact-router";

const SubjectCard = ({ subject }) => {
  const handleCardClick = () => {
    route(`/subject/${subject.id}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, cursor: "pointer" }} onClick={handleCardClick}>
      <CardContent>
        <Typography variant="h6">{subject.name}</Typography>
        {subject.description && (
          <Typography variant="body2" color="textSecondary">
            {subject.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectCard;

import { h } from "preact";
import { Card, CardContent, Typography } from "@mui/material";
import { route } from "preact-router";

const QuestionPoolCard = ({ questionPool }) => {
  const handleCardClick = () => {
    route(`/question-pool/${questionPool.id}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, cursor: "pointer" }} onClick={handleCardClick}>
      <CardContent>
        <Typography variant="h6">{questionPool.name}</Typography>
        {questionPool.description && (
          <Typography variant="body2" color="textSecondary">
            {questionPool.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionPoolCard;

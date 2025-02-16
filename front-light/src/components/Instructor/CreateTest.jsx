import { h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { createTest, listQuestionPoolsBySubject } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const CreateTest = ({ subjectId, onTestCreated }) => {
  const { auth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [instructions, setInstructions] = useState("");
  const [variants, setVariants] = useState(["A"]);
  const [questionSelections, setQuestionSelections] = useState([{ question_pool: "", positions: "" }]);
  const [questionPools, setQuestionPools] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchQuestionPools = async () => {
      try {
        const response = await listQuestionPoolsBySubject(subjectId);
        setQuestionPools(response.data);
      } catch (err) {
        setError(err.response?.data || t("failed_to_fetch_question_pools"));
      }
    };

    fetchQuestionPools();
  }, [subjectId, t]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await createTest({
        subject: subjectId,
        instructor_id: auth.user_id,
        name,
        notes,
        instructions,
        variants,
        question_selections: questionSelections.map((selection) => ({
          question_pool: selection.question_pool,
          positions: selection.positions.split(",").map(Number),
        })),
      });
      setName("");
      setNotes("");
      setInstructions("");
      setVariants(["A"]);
      setQuestionSelections([{ question_pool: "", positions: "" }]);
      setError(null);
      alert(t("test_created_successfully"));
      onTestCreated(response.data);
    } catch (err) {
      setError(err.response?.data || t("failed_to_create_test"));
    }
  };

  return (
    <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label={t("test_name")} fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label={t("notes")} fullWidth margin="normal" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <TextField label={t("instructions")} fullWidth margin="normal" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        {t("variants")}:
      </Typography>
      {variants.map((variant, index) => (
        <Typography key={index} variant="body2" sx={{ mt: 1 }}>
          {variant}
        </Typography>
      ))}
      <Button variant="outlined" color="primary" onClick={() => setVariants([...variants, String.fromCharCode(65 + variants.length)])} sx={{ mt: 2 }}>
        {t("add_variant")}
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {t("question_selections")}:
      </Typography>
      {questionSelections.map((selection, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t("question_pool")}</InputLabel>
            <Select value={selection.question_pool} onChange={(e) => {
                const newSelections = [...questionSelections];
                newSelections[index].question_pool = e.target.value;
                setQuestionSelections(newSelections);
            }} required>
              {questionPools.map((pool) => (
                <MenuItem key={pool.id} value={pool.id}>
                  {pool.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t("positions")}
            fullWidth
            margin="normal"
            value={selection.positions}
            onChange={(e) => {
              const newSelections = [...questionSelections];
              newSelections[index].positions = e.target.value;
              setQuestionSelections(newSelections);
            }}
            required
          />
        </Box>
      ))}
      <Button variant="outlined" color="primary" onClick={() => setQuestionSelections([...questionSelections, { question_pool: "", positions: "" }])} sx={{ mt: 2 }}>
        {t("add_question_selection")}
      </Button>
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, ml: 2 }}>
        {t("create_test")}
      </Button>
    </Box>
  );
};

export default CreateTest;

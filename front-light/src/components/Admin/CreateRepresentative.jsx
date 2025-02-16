import { h } from "preact";
import { useState } from "preact/hooks";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createRepresentative } from "../../services/authService";
import { useTranslation } from "react-i18next";

const CreateRepresentative = ({ institutionId, onRepresentativeCreated }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await createRepresentative({
        institution: institutionId,
        first_name,
        last_name,
        email,
        password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setError(null);
      alert(t("representative_created_successfully"));
      onRepresentativeCreated(response.data);
    } catch (err) {
      setError(t("failed_to_create_representative"));
    }
  };

  return (
    <Box component="form" onSubmit={handleCreate} sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label={t("first_name")} fullWidth margin="normal" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
      <TextField label={t("last_name")} fullWidth margin="normal" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
      <TextField label={t("email")} type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label={t("password")} type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        {t("create_representative")}
      </Button>
    </Box>
  );
};

export default CreateRepresentative;

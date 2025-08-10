import { Box, Typography, Paper, Chip, Stack, Button } from "@mui/material";
import Image from "../../Image/Image";
import { useNavigate } from "react-router";
import useMockUsernames from "../../../hooks/useMockUsernames.js";

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const { getUsernameById } = useMockUsernames();

  const authorName = getUsernameById(post.authorId) || `ID: ${post.authorId}`;

  const goToDetail = () => {
    navigate(`/posts/${post.id}`);
  };

  const publishDate = new Date(post.publishDate);
  const date = publishDate.toLocaleString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const hour = publishDate.toLocaleString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        width: "100%",
        maxWidth: "700px",
        mx: "auto",
        borderRadius: 2,
        boxShadow: "0 0 20px var(--border)",
        backgroundColor: "var(--card-bg)",
        border: "5px double var(--bg)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Header: autore e data */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        <Typography>{authorName}</Typography>
        <Typography>
          {date} alle {hour}
        </Typography>
      </Box>

      {/* Titolo */}
      <Typography
        variant="h4"
        component="h2"
        fontWeight={600}
        color="var(--text)"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        {post.title}
      </Typography>

      {/* Immagine */}
      {!post.image && (
        <Box
    sx={{
      mb: 3,
      width: "100%",
      height: "30vh",   // altezza fissa, non maxHeight
      overflow: "hidden",
      borderRadius: 2,
      mx: "auto",
    }}
  >
    <Image
      src={post.image}
      alt={`Immagine di copertina per ${post.title}`}
      variant="post-image"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </Box>
      )}

      {/* Contenuto */}
      <Box
        sx={{
          backgroundColor: "var(--bg)",
          borderRadius: 2,
          p: 1,
          minHeight: 50,
          maxHeight: 200,
          overflowY: "auto",
          mb: 2,
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <Box sx={{ mb: 2 }}>
        {post.tags?.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                sx={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
              />
            ))}
          </Stack>
        ) : (
          <Typography fontStyle="italic" fontSize="0.8rem">
            Nessun tag presente
          </Typography>
        )}
      </Box>

      {/* Info like/comment */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ mb: 0.5 }}>
          {post.total_likes > 0
            ? `Questo post ha ${post.total_likes} like`
            : "Questo post non ha like! Mettine tu uno per primo!"}
        </Typography>
        <Typography>
          {post.total_comments === 0
            ? "Nessun commento"
            : post.total_comments === 1
            ? "1 commento"
            : `${post.total_comments} commenti`}
        </Typography>
      </Box>

      {/* Bottone Mostra dettagli centrato */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" size="medium" onClick={goToDetail}>
          Mostra dettagli
        </Button>
      </Box>
    </Paper>
  );
};

export default PostItem;

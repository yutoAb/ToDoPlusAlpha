import AddTodoForm from "@/components/AddTodoForm";
import { fetchJSON } from "@/lib/api";
import {
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
type Todo = { id: number; title: string };

async function getTodos() {
  return fetchJSON<Todo[]>("/api/todos");
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <Box sx={{ pb: 8 /* フッター分の余白を確保 */ }}>
      <Container component="main" sx={{ py: 4 }}>
        <Typography variant={"h2"}>Todos</Typography>
        {todos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No tasks yet.
          </Typography>
        ) : (
          <List>
            {todos.map((t) => (
              <ListItem key={t.id} className="text-base">
                <ListItemIcon>
                  <Checkbox edge="start" tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={t.title} />
              </ListItem>
            ))}
          </List>
        )}
        <AddTodoForm />
      </Container>

      {/* footer 部分 */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          フッター
        </Typography>
      </Box>
    </Box>
  );
}

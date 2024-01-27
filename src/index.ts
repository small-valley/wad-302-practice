import { app } from "./app";
import { PORT } from "./env";

app.listen(PORT, () => {
	console.log(`[server]: running on port http://localhost:${PORT}. All good😎`);
});

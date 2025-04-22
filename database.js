import postgres from "postgres";

const sql = postgres('postgres://root:root@localhost/Isabelle');

export default sql;
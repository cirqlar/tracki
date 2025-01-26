use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
	Migration {
		version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE things (id INTEGER PRIMARY KEY, name TEXT, schema TEXT, created_at INTEGER, last_updated_at INTEGER);",
            kind: MigrationKind::Up,
	}
]
}

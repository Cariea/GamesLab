use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;
use tauri::Error;

#[derive(Debug, Serialize, Deserialize)]
struct Juego {
    name: String,
    active: bool,
    words: Vec<String>,
    description: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Config {
    games: Vec<Juego>,
}

#[tauri::command]
fn get_config() -> Result<Vec<Juego>, Error> {
    let path = std::env::current_exe()
        .expect("Error al obtener el path del ejecutable")
        .parent()
        .expect("Error al obtener el directorio del ejecutable")
        .to_owned();
    let config_path = path.join("config.json");
    let mut file = File::open(config_path)?;

    let mut data = String::new();
    file.read_to_string(&mut data)?;

    let config: Config = serde_json::from_str(&data)?;
    Ok(config.games)
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

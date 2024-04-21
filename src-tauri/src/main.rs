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

#[derive(Debug, Serialize, Deserialize)]
struct ConfigData {
    games: Vec<Juego>,
    file_name: String,
}

#[tauri::command]
fn get_config() -> Result<ConfigData, Error> {
    let path = std::env::current_exe()
        .expect("Error al obtener el path del ejecutable")
        .parent()
        .expect("Error al obtener el directorio del ejecutable")
        .to_owned();
    let config_path = path.join("config.json");

    let file_name = config_path
        .file_name()
        .unwrap()
        .to_string_lossy()
        .into_owned();

    let mut file = File::open(config_path)?;

    let mut data = String::new();
    file.read_to_string(&mut data)?;

    let config: Config = serde_json::from_str(&data)?;
    Ok(ConfigData {
        games: config.games,
        file_name,
    })
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

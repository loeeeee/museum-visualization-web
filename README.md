# Install

Install Cargo, and Rust

Install compiler target
```bash

cargo install wasm-pack
cargo install wasm-bindgen-cli
apt install libfontconfig-cli

```

Build the lib

```bash

wasm-pack build --target web

```

Run the /www

```bash

python3 -m http.server

```
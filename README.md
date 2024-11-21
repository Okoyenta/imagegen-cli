
# Image Generator CLI Documentation

The **Image Generator CLI** is a command-line tool that allows users to generate AI-powered images by providing prompts. This tool supports saving API keys, generating images, and storing them locally. This project makes use of together ai API. it uses free flux model from together ai to generate free images.

---

## Installation

### Prerequisites
1. If you already have Node.js installed:
   - Ensure `npm` is available by running:
     ```bash
     node -v
     npm -v
     ```
   - Then follow the **Installation with Node.js** section below.

2. **If Node.js is not installed:**
   - You can download a node js and run it.

---

### Installation with Node.js

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/your-username/image-generator-cli.git
   cd image-generator-cli
   ```

2. **Install the CLI Globally:**
   ```bash
   npm install -g .
   ```

3. **Verify Installation:**
   ```bash
   imagegen --help
   ```

---


## Usage

### 1. Set Your API Key
Before generating images, save your API key. This is a one-time setup.

```bash
imagegen set-api-key YOUR_API_KEY
```

- Replace `YOUR_API_KEY` with your actual API key, that you got from together.ai.
- The key is stored securely in your home directory in a configuration file.

---

### 2. Generate an Image

#### Basic Usage
Provide a prompt for image generation:
```bash
imagegen generate -p "A futuristic cityscape at sunset"
```

#### Save Images to a Custom Directory
Specify a custom directory to save the image:
```bash
imagegen generate -p "A vibrant rainforest" -d ./my-images
```

- Default directory: `./PIctures`.

---

## Commands

### 1. `set-api-key`
Stores your API key locally.

#### Syntax:
```bash
imagegen set-api-key <apiKey>
```

#### Example:
```bash
imagegen set-api-key sk-123abc456def
```

---

### 2. `generate`
Generates an image based on the provided prompt.

#### Syntax:
```bash
imagegen generate [options]
```

#### Options:
| Option             | Description                                         | Default              |
|--------------------|-----------------------------------------------------|----------------------|
| `-p, --prompt`     | The text prompt for image generation                | None (required)      |
| `-d, --directory`  | Directory to save the generated image               | `./generated-images` |

#### Examples:
- Generate an image with a specific prompt:
  ```bash
  imagegen generate -p "A scenic mountain view"
  ```
- Generate an image and save it to a custom directory:
  ```bash
  imagegen generate -p "A bustling futuristic city" -d ./my-outputs
  ```

---

## Features

1. **API Key Management**:
   - Stores API keys securely in a configuration file.

2. **Image Generation**:
   - Supports customizable prompts to generate AI-powered images.

3. **Customizable Output**:
   - Save images to any directory or use the default directory.

---

## FAQ

### Q1: Where is my API key stored?
Your API key is stored in a configuration file located at:
- Windows: `C:\Users\<username>\.image-generator-config.json`
- macOS/Linux: `~/.image-generator-config.json`

---


---

### Q2: What happens if I don't specify a prompt?
The `generate` command will fail because a prompt is required. Always include a prompt using `-p` or `--prompt`.

---

## Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

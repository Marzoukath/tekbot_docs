# ♻️ Final Test – Smart Conveyor System – TEKBOT CITY  
## IT Domain – Intelligent Detection and Real-Time Web Monitoring

<p align="center">
  <a href="#-objectives">🎯 Objectives</a> •
  <a href="#-summary">📝 Summary</a> •
  <a href="#-hardware">🔌 Hardware</a> •
  <a href="#-technologies--architecture">🌐 Technologies & Architecture</a> •
  <a href="#-web-interface">🖥️ Web Interface</a> •
  <a href="#-source-code">💻 Source Code</a> •
  <a href="#-results--testing">🧪 Results & Testing</a> •
  <a href="#-documentation">📚 Documentation</a>
</p>

---

## 🎯 Objectives

The objective is to develop an intelligent conveyor system capable of identifying and sorting **4 types of waste** represented by colored cubes (green, yellow, red, blue).  
The system should:
- Detect the presence of a waste item
- Identify its color with a color sensor
- Trigger the conveyor motor only when needed
- Transmit real-time data to a web dashboard showing the count of each waste type

---

## 📝 Summary

This project implements a smart waste-sorting conveyor using a **microcontroller (ATmega328P / Arduino Nano)** connected to a **color sensor** and a **presence detector**.  
An embedded program detects waste, identifies its color, and communicates the information to a Flask-based web interface in real time via serial communication.  
Administrators can monitor sorted waste quantities per color through a modern, responsive dashboard including the **TEKBOT** and **TRC 2025** logos.

---

## 🔌 Hardware

| Component                 | Description                              |
|--------------------------|------------------------------------------|
| Microcontroller          | ATmega328P                |
| Color Sensor             | TCS3472              |
| Presence Detection       | KY-008 laser module with photodiode / LDR |
| Conveyor Motor           | DC motor controlled via driver (L298N)   |
| Power Supply             | Lithium battery block                    |
| Waste Items              | 30 mm cubes (green, yellow, red, blue)   |

---

## 🌐 Technologies & Architecture

| Layer           | Tools / Technologies                  |
|-----------------|----------------------------------------|
| Embedded Logic  | Arduino (C++)                          |
| Web Server      | Flask (Python)                         |
| Frontend        | HTML, CSS,JS                |
| Communication   | Serial (USB) via pySerial              |
| Data Format     | JSON / plain text                      |
| Deployment      | Localhost or RPi-hosted Flask server   |

### 🧭 System Architecture

```text
+------------+         +-----------------+         +---------------------+
|  Sensor(s) | ---->   |  Arduino/Nano    |  --->  |    Flask Web Server |
| (Color + IR)|        | (ATmega328P)     |        | (Data Collection +  |
+------------+         +-----------------+         |     Visualization)  |
                                                   +---------------------+
```

---

## 🖥️ Web Interface

The web interface displays:
- The total count of each waste type (green, yellow, red, blue)
- Real-time updates upon detection
- Embedded logos of TEKBOT and TRC 2025
- A clean and responsive layout
- Battery Display
- Audio

![Web Dashboard Interface](page.png)

---

## 💻 Source Code

### 🧠 Arduino Embedded Logic

<details>
  <summary>Voir plus...</summary>

```cpp
// main.ino
// Detects waste and sends type to PC via serial
...
```

</details>

---

### 🌐 Flask Web Server

<details>
  <summary>Voir plus...</summary>

```python
# app.py
# Flask server to receive and process data from Arduino
...
```

</details>

---

### 🖼️ Web Dashboard (HTML Template)

<details>
  <summary>Voir plus...</summary>

```html
<!-- templates/index.html -->
<!-- Dashboard layout with TEKBOT and TRC logos -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>TekBot | DashBoard</title>
    <link rel="stylesheet" href="../static/style.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <nav class="navbar">
    <div class="navbar-left">
        <img src="../static/logo.png" alt="Logo Tekbot" class="logo" />
    </div>
    <div class="navbar-utils">
        <div class="battery-info">
            <i class="fas fa-battery-three-quarters battery-icon"></i>
            <span class="battery-level">--%</span>
        </div>
        <button class="volume-btn" onclick="lireRapport()">
            <i class="fas fa-volume-up volume-icon"></i>
        </button>
    </div>
    <div class="navbar-right">
        <img src="../static/trc.png" alt="Logo TRC" class="logo" />
    </div>
</nav>

  <div class="dashboard-container">
    <div class="card-section">

      <div class="card red">
        <div class="card-header">
          <h3>Red Waste</h3>
          <i class="fa-solid fa-trash-can waste-icon"></i>
        </div>
        <p class="value"><span id="rouge-count">{{ red }}</span></p>
      </div>

      <div class="card green">
        <div class="card-header">
          <h3>Green Waste</h3>
          <i class="fa-solid fa-trash-can waste-icon"></i>
        </div>
        <p class="value1"><span id="vert-count">{{ green }}</span></p>
      </div>

      <div class="card blue">
        <div class="card-header">
          <h3>Blue Waste</h3>
          <i class="fa-solid fa-trash-can waste-icon"></i>
        </div>
        <p class="value2"><span id="bleu-count">{{ blue }}</span></p>
      </div>

      <div class="card yellow">
        <div class="card-header">
          <h3>Yellow Waste</h3>
          <i class="fa-solid fa-trash-can waste-icon"></i>
        </div>
        <p class="value3"><span id="jaune-count">{{ yellow }}</span></p>
      </div>

     <!-- Carte du Total (nouvelle structure) -->
    <div class="total-card">
        <div class="total-content">
            <i class="fas fa-dumpster total-icon"></i>
            <div class="total-text">Total des déchets collectés :</div>
            <div class="total-value" id="total-count">{{ red + green + blue + yellow }}</div>
        </div>
    </div>
    

    <!-- Graphique ( -->
    <div class="chart-fullwidth">
        <h2 class="chart-title">Waste Distribution</h2>
        <canvas id="wasteHistogram"></canvas>
    </div>
  <script src="../static/script.js"></script>
</body>
</html>

...
```

</details>

---

## 🧪 Results & Testing

| Test Scenario                            | Expected Result                      | Outcome   |
|------------------------------------------|---------------------------------------|-----------|
| Waste detected and identified correctly  | Color is logged and counted          | ✅ Success |
| Motor activates only when needed         | Conveyor runs during detection       | ✅ Success |
| Real-time interface update               | Dashboard shows new counts instantly | ✅ Success |
| Interface displays all 4 types clearly   | All colors tracked                   | ✅ Success |
| TRC & TEKBOT logos visible               | Logos displayed                      | ✅ Success |

---

## 📚 Documentation

### 📌 Mechanical Specifications
- **Conveyor length**: 650 mm  
- **Height from floor**: 100 mm  
- **Waste object size**: 30 mm cube

### ⚙️ Design Tools
- **CAD software**: SolidWorks  
- **3D models**: Available in `/models/`  
- **Mechanical study**: Needs analysis, component choices, material justification

---

## 📁 Repository Structure

```
smart_conveyor/
├── arduino/
│   └── main.ino
├── web/
│   ├── app.py
│   ├── static/
│   ├── templates/
│   │   └── index.html
├── models/
│   └── conveyor.sldprt
├── capture final/
│   └── web_interface.png
└── README.md
```

---



## 👥 Team

- Agbodja Marzoukath  
- Ife Leonce Comlan  
- Chatigre Larissa  

> Final Project – TEKBOT Robotics Challenge 2025  
> Domain: IT  
> Stack: Arduino (C++) + Flask + HTML/CSS  
> Last Updated: June 2025

<p align="center"><sub>© 2025 TEKBOT Robotics Challenge – All Rights Reserved.</sub></p>

